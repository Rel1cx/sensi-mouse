import { invoke } from "./tauri"

export const getMouseCfg = () => {
    return invoke<[number, boolean]>("get_mouse_cfg")
}

export const setMouseCfg = (sen: number, accEnabled: boolean) => {
    return invoke("set_mouse_cfg", { accEnabled, sen })
}
