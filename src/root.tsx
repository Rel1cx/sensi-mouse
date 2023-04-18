import { Option, Result } from '@swan-io/boxed'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

export const renderApp = (sel: string): Result<string, Error> => {
    return Option.fromNullable(document.querySelector(sel)).match({
        None: () => {
            return Result.Error(new Error(`Could not find ${sel} element`))
        },
        Some: el => {
            const root = createRoot(el)

            root.render(
                <StrictMode>
                    <App />
                </StrictMode>
            )

            return Result.Ok('')
        }
    })
}
