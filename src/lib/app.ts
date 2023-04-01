import { invoke } from './tauri'

export function getMouseCfg() {
    return invoke<[number, boolean]>('get_mouse_cfg')
}

export function setMouseCfg(sen: number, accEnabled: boolean) {
    return invoke('set_mouse_cfg', { sen, accEnabled })
}
