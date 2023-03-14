import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

export function renderApp() {
    const container = document.querySelector('#app')

    if (!container) {
        throw new Error('No #app element found')
    }

    const root = createRoot(container)

    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
