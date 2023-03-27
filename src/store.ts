import { invoke } from '@tauri-apps/api/tauri'
import { atom, createStore } from 'jotai'

import { on } from './helper'

export const store = createStore()

export const senAtom = atom(0, (get, set, sen: number) => {
    set(senAtom, sen)
    invoke('set_mouse_cfg', { sen, accEnabled: get(accEnabledAtom) })
})

export const accEnabledAtom = atom(false, (get, set, accEnabled: boolean) => {
    set(accEnabledAtom, accEnabled)
    invoke('set_mouse_cfg', { sen: get(senAtom), accEnabled })
})

export const fetchState = async () => {
    const [sen, accEnabled] = await invoke<[number, boolean]>('get_mouse_cfg')

    store.set(senAtom, sen)
    store.set(accEnabledAtom, accEnabled)
}

fetchState()

on(window, 'focus', fetchState)
