import { invoke } from '@tauri-apps/api/tauri'
import { atom, getDefaultStore } from 'jotai'
import * as autostart from 'tauri-plugin-autostart-api'

import { setMouseCfg } from './lib/cmd'

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
