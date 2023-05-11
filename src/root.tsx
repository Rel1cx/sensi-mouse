import { Option } from '@swan-io/boxed'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

export const renderApp = (sel: string) => {
    const el = document.querySelector(sel)

    return Option.fromNullable(el)
        .map(createRoot)
        .map(root => {
            root.render(
                <StrictMode>
                    <App />
                </StrictMode>,
            )
        })
        .toResult(new Error(`Could not find element with selector: ${sel}`))
}
