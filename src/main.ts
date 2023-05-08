import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import { renderApp } from './root'
import { loadConfigAtom } from './store'

const main = async () => {
    window.addEventListener('focus', loadConfigAtom)
    await loadConfigAtom()

    renderApp('#app').match({
        Error: error => {
            document.textContent = JSON.stringify(error, null, 2)
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
