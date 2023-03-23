import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import { renderApp } from './root'

renderApp().match({
    Ok: value => {},
    Error: error => {
        document.write(error.message)
    }
})
