use hdk::prelude::*;
use messenger_integrity::{EntryTypes, LinkTypes, PeerMessage, PrivateMessengerEntry};

use crate::{
    linked_devices::query_my_linked_devices,
    private_messenger_entries::query_private_messenger_entries,
    signed::verify_signed,
    utils::{create_link_relaxed, create_relaxed, delete_link_relaxed},
};

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub struct EncryptedMessageBytes(XSalsa20Poly1305EncryptedData);

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub struct MessengerEncryptedMessage(pub PrivateMessengerEntry);

pub fn create_encrypted_message(
    recipient: AgentPubKey,
    message: MessengerEncryptedMessage,
) -> ExternResult<()> {
    let message_bytes = SerializedBytes::try_from(message).map_err(|err| wasm_error!(err))?;
    let encrypted_data = ed_25519_x_salsa20_poly1305_encrypt(
        agent_info()?.agent_latest_pubkey,
        recipient.clone(),
        message_bytes.bytes().clone().into(),
    )?;

    let tag_bytes = SerializedBytes::try_from(EncryptedMessageBytes(encrypted_data))
        .map_err(|err| wasm_error!(err))?;

    create_link_relaxed(
        recipient.clone(),
        recipient,
        LinkTypes::AgentEncryptedMessage,
        tag_bytes.bytes().clone(),
    )?;

    Ok(())
}

pub fn commit_my_pending_encrypted_messages() -> ExternResult<()> {
    let my_pub_key = agent_info()?.agent_latest_pubkey;
    let links = get_links(
        GetLinksInputBuilder::try_new(my_pub_key.clone(), LinkTypes::AgentEncryptedMessage)?
            .build(),
    )?;
    // let my_linked_devices = query_my_linked_devices()?;

    let private_messenger_entries = query_private_messenger_entries(())?;

    for link in links {
        let tag = link.tag;
        let bytes = SerializedBytes::from(UnsafeBytes::from(tag.into_inner()));
        let encrypted_data =
            EncryptedMessageBytes::try_from(bytes).map_err(|err| wasm_error!(err))?;

        let decrypted_data = ed_25519_x_salsa20_poly1305_decrypt(
            my_pub_key.clone(),
            link.author.clone(),
            encrypted_data.0,
        )?;

        let decrypted_bytes = decrypted_data.as_ref().to_vec();
        let decrypted_serialized_bytes = SerializedBytes::from(UnsafeBytes::from(decrypted_bytes));

        let message = MessengerEncryptedMessage::try_from(decrypted_serialized_bytes)
            .map_err(|err| wasm_error!(err))?;

        let private_messenger_entry = message.0;

        let valid = verify_signed(private_messenger_entry.0.clone())?;

        if valid {
            let private_messager_entry_hash = hash_entry(&private_messenger_entry)?;
            if !private_messenger_entries.contains_key(&private_messager_entry_hash.into()) {
                create_relaxed(EntryTypes::PrivateMessengerEntry(private_messenger_entry))?;
            }
        }

        delete_link_relaxed(link.create_link_hash)?;
    }

    Ok(())
}
