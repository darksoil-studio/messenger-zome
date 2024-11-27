use hdi::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct MessengerProfile {
    pub nickname: String,
    pub avatar_src: Option<String>,
}

pub fn merge_profiles(
    profile_1: Option<MessengerProfile>,
    profile_2: Option<MessengerProfile>,
) -> Option<MessengerProfile> {
    match (profile_1, profile_2) {
        (Some(p1), Some(p2)) => {
            let nickname = if p1.nickname < p2.nickname {
                p2.nickname
            } else {
                p1.nickname
            };
            let avatar_src = match (p1.avatar_src, p2.avatar_src) {
                (Some(a1), Some(a2)) => Some(if a1 < a2 { a2 } else { a2 }),
                (Some(a), None) => Some(a),
                (None, Some(a)) => Some(a),
                (None, None) => None,
            };

            Some(MessengerProfile {
                nickname,
                avatar_src,
            })
        }
        (Some(p1), None) => Some(p1),
        (None, Some(p2)) => Some(p2),
        (None, None) => None,
    }
}
