
```rust
struct Signed<T> {
  content: T,
  signature: Signature,
  provenance: AgentPubKey,
  timestamp: Timestamp,
}

struct Message {
  reply_to: Option<EntryHash>,
  message: String,
}

struct PeerMessage {
  recipient: AgentPubKey,
  message: Message
}

struct GroupInfo {
  name: String
}

struct CreateGroupChat {
  admins: Vec<AgentPubKey>,
  members: Vec<AgentPubKey>,
  info: GroupInfo
}

struct UpdateGroupChat {
  original_group_hash: EntryHash,
  previous_group_hash: EntryHash,
  
  admins: Vec<AgentPubKey>,
  members: Vec<AgentPubKey>,
  info: GroupInfo,
}

struct DeleteGroupChat {
  original_group_hash: EntryHash,
  previous_group_hash: EntryHash,
}

struct GroupMessage {
  original_group_hash: EntryHash,
  current_group_hash: EntryHash,

  message: Message,
}
```
