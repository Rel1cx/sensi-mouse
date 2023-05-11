import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import { Result } from '@swan-io/boxed'
import { enableMapSet, setAutoFreeze, setUseStrictShallowCopy } from 'immer'

import { loadConfigToAtom, loadDefaultConfigToAtom } from './atoms'
import { configManager } from './config'
import { renderApp } from './root'

enableMapSet()
setAutoFreeze(true)
setUseStrictShallowCopy(true)

const main = async () => {
    await Result.fromPromise(loadConfigToAtom()).then(r => {
        r.match({
            Ok: () => {},
            Error: async () => {
                await configManager.resetConfig()
                await loadDefaultConfigToAtom()
            },
        })
    })

    renderApp('#app').match({
        Ok: () => {
            window.addEventListener('focus', loadConfigToAtom)
            if (import.meta.env.DEV) {
                return
            }
            document.addEventListener('contextmenu', event => void event.preventDefault(), {
                capture: true,
            })
        },
        Error: console.error,
    })
}

void main()
