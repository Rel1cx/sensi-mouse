use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateFile {
    pub version: String,
    pub notes: String,
    #[serde(rename = "pub_date")]
    pub pub_date: String,
    pub platforms: Platforms,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Platforms {
    #[serde(rename = "darwin-x86_64")]
    pub darwin_x86_64: OsArch,
    #[serde(rename = "darwin-aarch64")]
    pub darwin_aarch64: OsArch,
    // #[serde(rename = "linux-x86_64")]
    // pub linux_x86_64: OsArch,
    // #[serde(rename = "windows-x86_64")]
    // pub windows_x86_64: OsArch,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OsArch {
    pub signature: String,
    pub url: String,
}
