use hdi::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, PartialOrd, Eq)]
pub struct Profile {
    pub nickname: String,
    pub avatar_src: String,
}
