import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import * as autostart from 'tauri-plugin-autostart-api'

import { configManager } from './config'
import { setMouseCfg } from './lib/cmd'
import { renderApp } from './root'

const main = async () => {
    const loadResult = await configManager.loadConfig()
    const launchAtLogin = await autostart.isEnabled()

    await loadResult.match({
        Error: async () => {
            await configManager.resetConfig()
        },
        Ok: async value => {
            await setMouseCfg(value.sen, value.accEnabled)
            await configManager.setConfig('launchAtLogin', launchAtLogin)
        }
    })

    await configManager.beginSyncConfig()

    renderApp('#app').match({
        Error: error => {
            document.write(error.message)
        },
        Ok: () => {
            if (import.meta.env.DEV) {
                return
            }
            document.addEventListener('contextmenu', event => void event.preventDefault(), {
                capture: true
            })
        }
    })
}

void main()
