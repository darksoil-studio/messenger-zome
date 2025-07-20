use profiles_provider_zome_trait::{Profile, PROFILES_PROVIDER_ZOME_TRAIT_HASH};
use xliff::t::T;

use hc_zome_traits::*;
use hdk::prelude::*;
use notifications_zome_trait::*;
use private_event_sourcing::{query_all_my_agents, query_private_event};

use crate::{
    query_group_chat_at_events, utils::find_zomes_with_zome_trait, GroupEvent, MessengerEvent,
};

pub struct MessengerNotifications;

#[implement_zome_trait_as_externs]
impl NotificationsZomeTrait for MessengerNotifications {
    fn get_notification(input: GetNotificationInput) -> ExternResult<Option<Notification>> {
        let Ok(event_hash) = EntryHashB64::from_b64_str(input.notification_id.as_str()) else {
            return Ok(None);
        };
        let Some(private_event) = query_private_event::<MessengerEvent>(event_hash.clone().into())?
        else {
            warn!(
                "Event for notification id {} not found.",
                input.notification_id
            );
            return Ok(None);
        };

        let my_agents = query_all_my_agents()?;

        if my_agents.contains(&private_event.author) {
            return Ok(None);
        }

        match private_event.payload.content.event {
            MessengerEvent::PeerMessage(peer_message) => {
                let profile = get_profile(private_event.author)?.ok_or(wasm_error!(
                    "Failed to get profile for author of the notification."
                ))?;

                Ok(Some(Notification {
                    title: profile.name,
                    body: peer_message.message.message.clone(),
                    large_body: Some(peer_message.message.message),
                    // icon: profile.avatar.unwrap_or(format!(
                    //     "data:image/svg+xml;charset=utf-8,{}",
                    //     md_icons::filled::ICON_PERSON
                    // )),
                    icon: None,
                    icon_color: None,
                    large_icon: None,
                    group: Some(format!("peer-chat/{}", peer_message.peer_chat_hash)),
                    group_summary: true,
                    summary: None,
                }))
            }
            MessengerEvent::CreateGroupChat(create_group_chat) => Ok(Some(Notification {
                title: create_group_chat.info.name,
                body: t(&input.locale, "You were added to the group."),
                large_body: Some(t(&input.locale, "You were added to the group.")),
                // icon_src: create_group_chat.info.avatar.unwrap_or(format!(
                //     "data:image/svg+xml;charset=utf-8,{}",
                //     md_icons::filled::ICON_GROUP
                // )),
                icon: None,
                icon_color: None,
                large_icon: None,
                group: Some(format!("group-chat/{}", event_hash)),
                group_summary: true,
                summary: None,
            })),
            MessengerEvent::GroupMessage(group_message) => {
                let Some(group_chat) = query_group_chat_at_events(
                    &group_message.group_chat_hash,
                    &group_message.current_group_chat_events_hashes,
                )?
                else {
                    return Err(wasm_error!("Failed to find group chat for notification."));
                };

                let Some(author_member) = group_chat
                    .members
                    .into_iter()
                    .find(|m| m.agents.contains(&private_event.author))
                else {
                    return Err(wasm_error!(
                        "Author of the notification is not a member of this group."
                    ));
                };

                let profile = match author_member.profile {
                    Some(p) => p,
                    None => get_profile(private_event.author)?.ok_or(wasm_error!(
                        "Failed to get profile for the author of the notification."
                    ))?,
                };

                Ok(Some(Notification {
                    title: profile.name,
                    body: group_message.message.message.clone(),
                    large_body: Some(group_message.message.message),
                    // icon_src: group_chat.info.avatar.unwrap_or(format!(
                    //     "data:image/svg+xml;charset=utf-8,{}",
                    //     md_icons::filled::ICON_GROUPS
                    // )),
                    icon: None,
                    icon_color: None,
                    large_icon: None,
                    group: Some(format!("group-chat/{}", group_message.group_chat_hash)),
                    group_summary: true,
                    summary: None,
                }))
            }
            MessengerEvent::GroupChatEvent(event) => match event.event {
                GroupEvent::AddMember { profile, .. } => {
                    let Some(group_chat) = query_group_chat_at_events(
                        &event.group_chat_hash,
                        &event.previous_group_chat_events_hashes,
                    )?
                    else {
                        return Err(wasm_error!("Failed to find group chat for notification."));
                    };

                    let profile = match profile {
                        Some(p) => p,
                        None => get_profile(private_event.author)?.ok_or(wasm_error!(
                            "Failed to get profile for the author of the notification."
                        ))?,
                    };

                    Ok(Some(Notification {
                        title: group_chat.info.name,
                        body: format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "was added to the group.")
                        ),
                        large_body: Some(format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "was added to the group.")
                        )),
                        // icon_src: group_chat.info.avatar.unwrap_or(format!(
                        //     "data:image/svg+xml;charset=utf-8,{}",
                        //     md_icons::filled::ICON_GROUP
                        // )),
                        icon: None,
                        icon_color: None,
                        large_icon: None,
                        group: Some(format!("group-chat/{}", event.group_chat_hash)),
                        group_summary: true,
                        summary: None,
                    }))
                }
                GroupEvent::RemoveMember { member_agents } => {
                    let Some(group_chat) = query_group_chat_at_events(
                        &event.group_chat_hash,
                        &event.previous_group_chat_events_hashes,
                    )?
                    else {
                        return Err(wasm_error!("Failed to find group chat for notification."));
                    };

                    let Some(member) = group_chat
                        .members
                        .into_iter()
                        .find(|m| !m.agents.is_disjoint(&member_agents))
                    else {
                        return Err(wasm_error!(
                            "Author of the notification is not a member of this group."
                        ));
                    };

                    let profile = match member.profile {
                        Some(p) => p,
                        None => get_profile(
                            member_agents
                                .first()
                                .ok_or(wasm_error!(
                                    "RemoveMember event contained to member_agents"
                                ))?
                                .clone(),
                        )?
                        .ok_or(wasm_error!(
                            "Failed to get profile for the author of the notification."
                        ))?,
                    };

                    Ok(Some(Notification {
                        title: group_chat.info.name,
                        body: format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "was removed from the group.")
                        ),
                        large_body: Some(format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "was removed from the group.")
                        )),

                        icon: None,
                        icon_color: None,
                        large_icon: None,
                        // icon_src: group_chat.info.avatar.unwrap_or(format!(
                        //     "data:image/svg+xml;charset=utf-8,{}",
                        //     md_icons::filled::ICON_GROUP
                        // )),
                        group: Some(format!("group-chat/{}", event.group_chat_hash)),
                        group_summary: true,
                        summary: None,
                    }))
                }
                GroupEvent::LeaveGroup => {
                    let Some(group_chat) = query_group_chat_at_events(
                        &event.group_chat_hash,
                        &event.previous_group_chat_events_hashes,
                    )?
                    else {
                        return Err(wasm_error!("Failed to find group chat for notification."));
                    };

                    let Some(member) = group_chat
                        .members
                        .into_iter()
                        .find(|m| !m.agents.contains(&private_event.author))
                    else {
                        return Err(wasm_error!(
                            "Author of the notification is not a member of this group."
                        ));
                    };

                    let profile = match member.profile {
                        Some(p) => p,
                        None => get_profile(private_event.author)?.ok_or(wasm_error!(
                            "Failed to get profile for the author of the notification."
                        ))?,
                    };

                    Ok(Some(Notification {
                        title: group_chat.info.name,
                        body: format!("{} {}", profile.name, t(&input.locale, "left the group.")),
                        large_body: Some(format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "left the group.")
                        )),
                        // icon_src: group_chat.info.avatar.unwrap_or(format!(
                        //     "data:image/svg+xml;charset=utf-8,{}",
                        //     md_icons::filled::ICON_GROUP
                        // )),
                        icon: None,
                        icon_color: None,
                        large_icon: None,
                        group: Some(format!("group-chat/{}", event.group_chat_hash)),
                        group_summary: true,
                        summary: None,
                    }))
                }
                GroupEvent::DeleteGroup => {
                    let Some(group_chat) = query_group_chat_at_events(
                        &event.group_chat_hash,
                        &event.previous_group_chat_events_hashes,
                    )?
                    else {
                        return Err(wasm_error!("Failed to find group chat for notification."));
                    };

                    let Some(member) = group_chat
                        .members
                        .into_iter()
                        .find(|m| !m.agents.contains(&private_event.author))
                    else {
                        return Err(wasm_error!(
                            "Author of the notification is not a member of this group."
                        ));
                    };

                    let profile = match member.profile {
                        Some(p) => p,
                        None => get_profile(private_event.author)?.ok_or(wasm_error!(
                            "Failed to get profile for the author of the notification."
                        ))?,
                    };

                    Ok(Some(Notification {
                        title: group_chat.info.name,
                        body: format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "deleted the group.")
                        ),
                        large_body: Some(format!(
                            "{} {}",
                            profile.name,
                            t(&input.locale, "deleted the group.")
                        )),

                        icon: None,
                        icon_color: None,
                        large_icon: None,
                        // icon_src: group_chat.info.avatar.unwrap_or(format!(
                        //     "data:image/svg+xml;charset=utf-8,{}",
                        //     md_icons::filled::ICON_GROUP
                        // )),
                        group: Some(format!("group-chat/{}", event.group_chat_hash)),
                        group_summary: true,
                        summary: None,
                    }))
                }
                _ => Ok(None),
            },
            _ => Ok(None),
        }
    }
}

fn get_profile(agent: AgentPubKey) -> ExternResult<Option<Profile>> {
    let zomes = find_zomes_with_zome_trait(PROFILES_PROVIDER_ZOME_TRAIT_HASH)?;

    if zomes.is_empty() {
        return Err(wasm_error!("No ProfilesProviders zomes found."));
    }

    debug!("Getting the profile from zomes {zomes:?}");

    for zome in zomes {
        let r = call(
            CallTargetCell::Local,
            zome,
            "get_profile".into(),
            None,
            agent.clone(),
        )?;
        let ZomeCallResponse::Ok(r) = r else {
            error!("Error calling get_profile: {r:?}");
            continue;
        };
        let Ok(profile) = r.decode::<Option<Profile>>() else {
            error!("Error decoding get_profile result");
            continue;
        };

        return Ok(profile);
    }

    Err(wasm_error!(
        "Failed to find the profile for this agent in all zomes."
    ))
}

fn t(locale: &String, source: &str) -> String {
    match locale.as_str() {
        // "sv" => t_from_xliff(include_str!("../../../../ui/xliff/sv.xlf"), source),
        "en" => source.to_string(),
        _ => source.to_string(),
    }
}

fn t_from_xliff(xliff_str: &str, source: &str) -> String {
    let t = T::load_str(xliff_str);
    let unit = t.t_source(None, source);
    if let Some(unit) = unit {
        if let Some(t) = unit.target_text() {
            return t.clone();
        }
    }
    source.to_string()
}
