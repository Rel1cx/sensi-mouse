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

export const setAutoLaunchAtom = atom(null, async (_, set, enabled: boolean) => {
    const result = enabled ? await enableAutoStart() : await disableAutoStart()

    result.match({
        Ok: () => set(autoLaunchAtom, enabled),
        // eslint-disable-next-line no-console
        Error: () => console.error(`Failed to set auto launch ${enabled}`)
    })
})

export const fetchState = async () => {
    const [sen, accEnabled] = await invoke<[number, boolean]>('get_mouse_cfg')
    const autoStart = await getAutoStart()

    store.set(senAtom, sen)
    store.set(accEnabledAtom, accEnabled)
    store.set(autoLaunchAtom, autoStart.getWithDefault(false))
}

fetchState()

on(window, 'focus', fetchState)
