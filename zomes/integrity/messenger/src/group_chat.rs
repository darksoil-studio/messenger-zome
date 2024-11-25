use hdi::prelude::*;
use linked_devices_types::{are_agents_linked, LinkedDevicesProof};

use crate::Message;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupChat {
    pub members: Vec<GroupMember>,
    pub info: GroupInfo,
    pub settings: GroupSettings,
    pub deleted: bool,
}

impl GroupChat {
    pub fn apply(mut self, provenance: &AgentPubKey, event: &GroupEvent) -> ExternResult<Self> {
        let author_member = self.members.iter().find(|m| m.agents.contains(&provenance));
        let Some(author_member) = author_member else {
            return Err(wasm_error!(
                "Author of the GroupEvent is not a member of the group"
            ));
        };
        let author_is_admin = author_member.admin;
        match event {
            GroupEvent::UpdateGroupInfo(group_info) => {
                if self.settings.only_admins_can_edit_group_info && !author_is_admin {
                    return Err(wasm_error!("Only admins can update the group's info"));
                }
                self.info = group_info.clone();
            }
            GroupEvent::UpdateGroupSettings(group_settings) => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can update the group's settings"));
                }
                self.settings = group_settings.clone();
            }
            GroupEvent::AddMember(member) => {
                if self.settings.only_admins_can_manage_members && !author_is_admin {
                    return Err(wasm_error!("Only admins can update the group's info"));
                }

                self.members.push(member.clone())
            }
            GroupEvent::RemoveMember { member_agents } => {
                if self.settings.only_admins_can_manage_members && !author_is_admin {
                    return Err(wasm_error!("Only admins can update the group's info"));
                }

                let pos = self.members.iter().position(|m| {
                    m.agents
                        .iter()
                        .find(|d| member_agents.contains(d))
                        .is_some()
                });
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };
                self.members.remove(p);
            }
            GroupEvent::NewAgentForMember {
                new_agent,
                linked_devices_proofs,
            } => {
                let pos = self
                    .members
                    .iter()
                    .position(|m| m.agents.contains(&provenance));
                let Some(p) = pos else {
                    return Err(wasm_error!("Member for the given provenance not found"));
                };
                let linked = are_agents_linked(&provenance, &new_agent, &linked_devices_proofs);
                if !linked {
                    return Err(wasm_error!("Invalid proof"));
                }
                self.members[p].agents.push(new_agent.clone());
            }
            GroupEvent::PromoteMemberToAdmin { member_agents } => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can promote members to admins"));
                }
                let pos = self.members.iter().position(|m| {
                    m.agents
                        .iter()
                        .find(|d| member_agents.contains(d))
                        .is_some()
                });
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };
                self.members[p].admin = true;
            }
            GroupEvent::DemoteMemberFromAdmin { member_agents } => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can promote members to admins"));
                }
                let pos = self.members.iter().position(|m| {
                    m.agents
                        .iter()
                        .find(|d| member_agents.contains(d))
                        .is_some()
                });
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };
                self.members[p].admin = false;
            }
            GroupEvent::DeleteGroup => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can delete groups"));
                }
            }
            GroupEvent::LeaveGroup => {
                let author_member_index = self
                    .members
                    .iter()
                    .position(|m| m.agents.contains(&provenance));
                let Some(i) = author_member_index else {
                    return Err(wasm_error!("Unreachable: member position not found?"));
                };
                self.members.remove(i);
            }
            _ => {}
        };

        Ok(self)
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupInfo {
    pub name: String,
    pub description: String,
    pub avatar_hash: Option<EntryHash>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupSettings {
    pub only_admins_can_edit_group_info: bool,
    pub only_admins_can_manage_members: bool,
    pub sync_message_history_with_new_members: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct GroupMember {
    pub agents: Vec<AgentPubKey>,
    pub admin: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(tag = "type")]
pub enum GroupEvent {
    UpdateGroupInfo(GroupInfo),
    UpdateGroupSettings(GroupSettings),
    AddMember(GroupMember),
    RemoveMember {
        member_agents: Vec<AgentPubKey>,
    },
    NewAgentForMember {
        new_agent: AgentPubKey,
        linked_devices_proofs: Vec<LinkedDevicesProof>,
    },
    PromoteMemberToAdmin {
        member_agents: Vec<AgentPubKey>,
    },
    DemoteMemberFromAdmin {
        member_agents: Vec<AgentPubKey>,
    },
    DeleteGroup,
    ReconcileHistories {
        accepted_previous_event: EntryHash,
    },
    RejectHistory {
        rejected_previous_event: EntryHash,
    },
    LeaveGroup,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupChatEvent {
    pub group_hash: EntryHash,
    pub previous_event_hash: EntryHash,

    pub event: GroupEvent,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupMessage {
    pub group_hash: EntryHash,
    pub current_event_hash: EntryHash,

    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadGroupMessages {
    pub group_hash: EntryHash,
    pub current_event_hash: EntryHash,
    pub read_messages_hashes: Vec<EntryHash>,
}
