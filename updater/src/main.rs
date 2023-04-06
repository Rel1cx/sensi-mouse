use crate::ghdata::Root;
use crate::updatefile::UpdateFile;
use regex::Regex;

mod ghdata;
mod updatefile;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let response: Root = client
        .get("https://api.github.com/repos/Nicify/sensi-mouse/releases/latest")
        .header("user-agent", "updater/0.0.1")
        .send()
        .await?
        .json()
        .await?;

    let mut update_file = UpdateFile {
        version: response.name,
        notes: response.body,
        pub_date: response.published_at,
        ..Default::default()
    };

    let darwin = Regex::new(r"^.+.app.tar.gz$").unwrap();
    let darwin_sig = Regex::new(r"^.+.app.tar.gz.sig$").unwrap();
    // let windows = Regex::new(r"^.+_\d+.\d+.\d+_x64_en-US.msi.zip$").unwrap();
    // let windows_sig = Regex::new(r"^.+_\d+.\d+.\d+_x64_en-US.msi.zip.sig$").unwrap();
    // let appimage = Regex::new(r"^.+_\d+.\d+.\d+_amd64.AppImage.tar.gz$").unwrap();
    // let appimage_sig = Regex::new(r"^.+_\d+.\d+.\d+_amd64.AppImage.tar.gz.sig$").unwrap();

    for asset in response.assets.iter() {
        if darwin.is_match(&asset.name) {
            update_file.platforms.darwin_x86_64.url = asset.browser_download_url.clone();
            update_file.platforms.darwin_aarch64.url = asset.browser_download_url.clone();
            continue;
        }
        // if windows.is_match(&asset.name) {
        //     update_file.platforms.windows_x86_64.url = asset.browser_download_url.clone();
        //     continue;
        // }
        // if appimage.is_match(&asset.name) {
        //     update_file.platforms.linux_x86_64.url = asset.browser_download_url.clone();
        //     continue;
        // }
        if darwin_sig.is_match(&asset.name) {
            let signature_bytes = client
                .get(asset.browser_download_url.clone())
                .header("user-agent", "updater/0.0.1")
                .send()
                .await?
                .bytes()
                .await?;

            update_file.platforms.darwin_x86_64.signature = String::from_utf8_lossy(&signature_bytes).to_string();
            update_file.platforms.darwin_aarch64.signature = String::from_utf8_lossy(&signature_bytes).to_string();

            continue;
        }
        // if windows_sig.is_match(&asset.name) {
        //     let signature_bytes = client
        //         .get(asset.browser_download_url.clone())
        //         .header("user-agent", "updater/0.0.1")
        //         .send()
        //         .await?
        //         .bytes()
        //         .await?;
        //     update_file.platforms.windows_x86_64.signature =
        //         String::from_utf8_lossy(&signature_bytes).to_string();
        //     continue;
        // }
        // if appimage_sig.is_match(&asset.name) {
        //     let signature_bytes = client
        //         .get(asset.browser_download_url.clone())
        //         .header("user-agent", "updater/0.0.1")
        //         .send()
        //         .await?
        //         .bytes()
        //         .await?;
        //     update_file.platforms.linux_x86_64.signature =
        //         String::from_utf8_lossy(&signature_bytes).to_string();
        //     continue;
        // }
    }
    let x = serde_json::to_string(&update_file)?;
    println!("{}", x);
    Ok(())
}
