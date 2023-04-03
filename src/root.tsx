import { Option, Result } from '@swan-io/boxed'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

export function renderApp(): Result<string, Error> {
    return Option.fromNullable(document.querySelector('#app')).match({
        Some: el => {
            const root = createRoot(el)

            root.render(
                <StrictMode>
                    <App />
                </StrictMode>
            )

            return Result.Ok('')
        },
        None: () => {
            return Result.Error(new Error('Could not find #app element'))
        }
    })
}
