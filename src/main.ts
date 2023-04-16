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
        Ok: async value => {
            await setMouseCfg(value.sen, value.accEnabled)
            await configManager.setConfig('launchAtLogin', launchAtLogin)
        },
        Error: async () => {
            await configManager.resetConfig()
        }
    })

    await configManager.beginSyncConfig()
    
    renderApp('#app').match({
        Ok: () => {
            if (import.meta.env.DEV) {
                return
            }
            document.addEventListener('contextmenu', event => void event.preventDefault(), {
                capture: true
            });
        },
        Error: error => {
            document.write(error.message)
        }
    })
}

void main()
