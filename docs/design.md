
```rust
struct Signed<T> {
  content: T,
  signature: Signature,
  provenance: AgentPubKey,
  timestamp: Timestamp,
}

struct PeerMessage {
  message: String,
}

struct CreateGroup {
  admins: Vec<AgentPubKey>,
  members: Vec<AgentPubKey>,
  name: String
}

struct UpdateGroup {
  original_group_hash: EntryHash,
  previous_group_hash: EntryHash,
  
  admins: Vec<AgentPubKey>,
  members: Vec<AgentPubKey>,
  name: String,
}

struct GroupMessage {
  original_group_hash: EntryHash,
  current_group_hash: EntryHash,
  message: String,
}
```
