import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import * as autostart from 'tauri-plugin-autostart-api'

import { configProxy, loadConfig, resetConfig } from './config'
import { setMouseCfg } from './lib/cmd'
import { renderApp } from './root'

const main = async () => {
    const loadResult = await loadConfig()
    const launchAtLogin = await autostart.isEnabled()

    await loadResult.match({
        Ok: async value => {
            Object.assign(configProxy, value)
            configProxy.launchAtLogin = launchAtLogin
            await setMouseCfg(value.sen, value.accEnabled)
        },
        Error: async () => {
            await resetConfig()
        }
    })

    renderApp().match({
        Ok: _ => {},
        Error: error => {
            document.write(error.message)
        }
    })
}

main()
