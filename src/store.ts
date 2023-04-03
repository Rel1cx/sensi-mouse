import { invoke } from '@tauri-apps/api/tauri'
import { atom, getDefaultStore } from 'jotai'
import * as autostart from 'tauri-plugin-autostart-api'

import { DEFAULT_ACC_ENABLED, DEFAULT_SEN } from './constants'
import { getMouseCfg, setMouseCfg } from './lib/cmd'
import { on } from './lib/dom'

export const store = getDefaultStore()

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

export const fetchState = async () => {
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

export const resetState = () => {
    store.set(senAtom, DEFAULT_SEN)
    store.set(accEnabledAtom, DEFAULT_ACC_ENABLED)
}

on(window)('focus', fetchState)
