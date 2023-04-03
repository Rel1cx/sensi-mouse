import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import { initI18n } from './helper'
import { renderApp } from './root'
import { fetchState } from './store'

const main = async () => {
    await initI18n()
    await fetchState()

    renderApp().match({
        Ok: _ => {},
        Error: error => {
            document.write(error.message)
        }
    })
}

main()
