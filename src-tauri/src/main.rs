use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn system_tray() -> SystemTray {
    let preference = CustomMenuItem::new("preference", "Preference");
    let about = CustomMenuItem::new("about", "About");
    let quit = CustomMenuItem::new("quit", "Quit");
    let tray_menu = SystemTrayMenu::new()
        .add_item(preference)
        .add_item(about)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
}

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

fn main() {
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .system_tray(system_tray())
        .on_system_tray_event(|app, ev| {
            if let SystemTrayEvent::MenuItemClick { id, .. } = ev {
                match id.as_str() {
                    "preference" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                    // "about" => {
                    //     let window = app.get_window("about").unwrap();
                    //     window.show().unwrap();
                    //     window.set_focus().unwrap();
                    // }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                }
            }
        })
        .invoke_handler(tauri::generate_handler![])
        .setup(move |app| {
            let main_window = app.get_window("main").unwrap();
            main_window.show().unwrap();
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}
