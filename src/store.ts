import { invoke } from '@tauri-apps/api/tauri'
import { proxy } from 'valtio'

import { on } from './helper'

export const state = proxy({
    sen: 0,
    accEnabled: false
})

export const fetchState = async () => {
    const [sen, accEnabled] = await invoke<[number, boolean]>('get_mouse_cfg')

    state.sen = sen
    state.accEnabled = accEnabled
}

fetchState()

on(window, 'focus', fetchState)
