import { invoke } from '@tauri-apps/api/tauri'
import { atom, createStore } from 'jotai'
import * as autostart from 'tauri-plugin-autostart-api'

import { getMouseCfg, setMouseCfg } from './lib/app'
import { on } from './lib/dom'

export const DEFAULT_SEN = 90

export const DEFAULT_ACC_ENABLED = false

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
    enabled ? await autostart.enable() : await autostart.disable()

    set(autoLaunchAtom, enabled)
})

export function resetState() {
    store.set(senAtom, DEFAULT_SEN)
    store.set(accEnabledAtom, DEFAULT_ACC_ENABLED)
}

export async function fetchState() {
    const ret = await getMouseCfg()
    const [sen, accEnabled] = ret.match({
        Ok: v => v,
        Error: () => [DEFAULT_SEN, DEFAULT_ACC_ENABLED]
    })

    const autoStart = await autostart.isEnabled()

    store.set(senAtom, sen)
    store.set(accEnabledAtom, accEnabled)
    store.set(autoLaunchAtom, autoStart)
}

fetchState()

on(window, 'focus', fetchState)
