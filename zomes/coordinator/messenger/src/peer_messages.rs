use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    linked_devices::get_all_agents_for, private_messenger_entries::create_private_messenger_entry,
};

#[hdk_extern]
pub fn send_peer_message(message_content: PeerMessage) -> ExternResult<()> {
    let recipients = get_all_agents_for(message_content.recipient.clone())?;

    let content = PrivateMessengerEntryContent::PeerMessage(message_content);

    create_private_messenger_entry(content, recipients)?;

    Ok(())
}
