use xliff::t::T;

use hc_zome_traits::*;
use hdk::prelude::*;
use notifications_zome_trait::*;
use private_event_sourcing::{query_all_my_agents, query_private_event};

use crate::MessengerEvent;

pub struct MessengerNotifications;

#[implement_zome_trait_as_externs]
impl NotificationsZomeTrait for MessengerNotifications {
    fn get_notification(input: GetNotificationInput) -> ExternResult<Option<Notification>> {
        let event_hash = EntryHashB64::from_b64_str(input.notification_id.as_str())
            .map_err(|_err| wasm_error!("Failed to convert notification id to EntryHash."))?;
        let Some(private_event) = query_private_event::<MessengerEvent>(event_hash.clone().into())?
        else {
            return Ok(None);
        };

        let my_agents = query_all_my_agents()?;

        if my_agents.contains(&private_event.author) {
            return Ok(None);
        }

        match private_event.payload.content.event {
            MessengerEvent::PeerMessage(peer_message) => Ok(Some(Notification {
                title: format!(""), // I need to get the name
                body: peer_message.message.message,
                icon_src: format!(
                    "data:image/svg+xml;charset=utf-8,{}",
                    md_icons::filled::ICON_PERSON_REMOVE_ALT_1
                ),
                url_path_to_navigate_to_on_click: None,
                group: Some(format!("{}", peer_message.peer_chat_hash)),
            })),
            _ => Ok(None),
        }
    }
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
