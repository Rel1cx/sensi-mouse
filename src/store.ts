import { invoke } from '@tauri-apps/api/tauri'
import { atom, createStore } from 'jotai'

import { disableAutoStart, enableAutoStart, getAutoStart, getMouseCfg, setMouseCfg } from './lib/app'
import { on } from './lib/dom'

export const store = createStore()

export const senAtom = atom(0, async (get, set, sen: number) => {
    set(senAtom, sen)
    invoke('set_mouse_cfg', { sen, accEnabled: get(accEnabledAtom) })
    await setMouseCfg(sen, get(accEnabledAtom))
})

export const accEnabledAtom = atom(false, async (get, set, accEnabled: boolean) => {
    set(accEnabledAtom, accEnabled)
    await setMouseCfg(get(senAtom), accEnabled)
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

export function resetState() {
    store.set(senAtom, 90)
    store.set(accEnabledAtom, false)
}

export async function fetchState() {
    const [sen, accEnabled] = await invoke<[number, boolean]>('get_mouse_cfg')
    const autoStart = await getAutoStart()

    store.set(senAtom, sen)
    store.set(accEnabledAtom, accEnabled)
    store.set(autoLaunchAtom, autoStart.getWithDefault(false))
}

fetchState()

on(window, 'focus', fetchState)
