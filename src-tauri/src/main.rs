#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use sys_locale::get_locale;

#[tauri::command]
fn get_system_lang() -> String {
    let lang: String = get_locale().unwrap_or_else(|| "invalid".to_string()).into();
    return lang;
}

fn main() -> () {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_system_lang])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
