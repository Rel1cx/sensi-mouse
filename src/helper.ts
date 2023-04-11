import * as autostart from 'tauri-plugin-autostart-api'

import { accEnabledAtom, autoLaunchAtom, senAtom, store } from './atoms'
import { DEFAULT_ACC_ENABLED, DEFAULT_SEN } from './constants'
import { getMouseCfg } from './lib/cmd'

export const syncAppStateWithSystem = async () => {
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

export const resetAppState = () => {
    store.set(senAtom, DEFAULT_SEN)
    store.set(accEnabledAtom, DEFAULT_ACC_ENABLED)
}
