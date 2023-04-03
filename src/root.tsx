import { Option, Result } from '@swan-io/boxed'
import { Provider } from 'jotai'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { fetchState, initI18n, store } from './store'

export async function renderApp(): Promise<Result<string, Error>> {
    await initI18n()
    await fetchState()

    return Option.fromNullable(document.querySelector('#app')).match({
        Some: el => {
            const root = createRoot(el)

            root.render(
                <StrictMode>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StrictMode>
            )

            return Result.Ok('')
        },
        None: () => {
            return Result.Error(new Error('Could not find #app element'))
        }
    })
}
