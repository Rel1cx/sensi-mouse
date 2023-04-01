import { invoke } from '@tauri-apps/api/tauri'
import { atom, createStore } from 'jotai'

import { on } from './lib/dom'
import { disableAutoStart, enableAutoStart, getAutoStart } from './lib/tauri'

export const store = createStore()

export const senAtom = atom(0, (get, set, sen: number) => {
    set(senAtom, sen)
    invoke('set_mouse_cfg', { sen, accEnabled: get(accEnabledAtom) })
})

export const accEnabledAtom = atom(false, (get, set, accEnabled: boolean) => {
    set(accEnabledAtom, accEnabled)
    invoke('set_mouse_cfg', { sen: get(senAtom), accEnabled })
})

export const autoLaunchAtom = atom(false)

export const setAutoLaunchAtom = atom(null, async (get, set, enabled: boolean) => {
    await (enabled ? enableAutoStart() : disableAutoStart())
    set(autoLaunchAtom, enabled)
})

export const fetchState = async () => {
    const [sen, accEnabled] = await invoke<[number, boolean]>('get_mouse_cfg')
    const autoStart = await getAutoStart()

    store.set(senAtom, sen)
    store.set(accEnabledAtom, accEnabled)
    store.set(autoLaunchAtom, autoStart)
}

fetchState()

on(window, 'focus', fetchState)
