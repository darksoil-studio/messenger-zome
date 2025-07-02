use std::collections::BTreeMap;

pub use profiles_provider_zome_trait::Profile;

pub fn merge_profiles(profile_1: Option<Profile>, profile_2: Option<Profile>) -> Option<Profile> {
    match (profile_1, profile_2) {
        (Some(p1), Some(p2)) => {
            let name = merge_strings(p1.name, p2.name);
            let avatar = match (p1.avatar, p2.avatar) {
                (Some(a1), Some(a2)) => Some(if a1 < a2 { a2 } else { a2 }),
                (Some(a), None) => Some(a),
                (None, Some(a)) => Some(a),
                (None, None) => None,
            };
            let fields = merge_maps(p1.fields, p2.fields);

            Some(Profile {
                name,
                avatar,
                fields,
            })
        }
        (Some(p1), None) => Some(p1),
        (None, Some(p2)) => Some(p2),
        (None, None) => None,
    }
}

fn merge_maps(
    mut a: BTreeMap<String, String>,
    b: BTreeMap<String, String>,
) -> BTreeMap<String, String> {
    for (key, b_value) in b {
        if let Some(a_value) = a.get(&key) {
            a.insert(key, merge_strings(a_value.clone(), b_value));
        } else {
            a.insert(key, b_value);
        }
    }

    a
}

fn merge_strings(a: String, b: String) -> String {
    if a < b {
        b
    } else {
        a
    }
}
