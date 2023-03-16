import { invoke } from '@tauri-apps/api/tauri'
import { proxy, subscribe } from 'valtio'

export const state = proxy({
    sen: 0,
    accEnabled: false
})

export const fetchState = async () => {
    const [sen, accEnabled] = await invoke<[number, boolean]>('get_mouse_cfg')

    state.sen = sen
    state.accEnabled = accEnabled
}

subscribe(state, () => {
    requestAnimationFrame(() => invoke('set_mouse_cfg', { sen: state.sen, accEnabled: state.accEnabled }))
})
