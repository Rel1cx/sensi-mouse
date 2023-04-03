import { Option, Result } from '@swan-io/boxed'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import TypesafeI18n from './i18n/i18n-react'
import { isLocale } from './i18n/i18n-util'
import { loadLocaleAsync } from './i18n/i18n-util.async'
import { getSettings } from './lib/settings'

export async function renderApp(): Promise<Result<string, Error>> {
    const local = await getSettings('locale', 'en', isLocale)

    await loadLocaleAsync(local)

    return Option.fromNullable(document.querySelector('#app')).match({
        Some: el => {
            const root = createRoot(el)

            root.render(
                <StrictMode>
                    <TypesafeI18n locale={local}>
                        <App />
                    </TypesafeI18n>
                </StrictMode>
            )

            return Result.Ok('App rendered')
        },
        None: () => {
            return Result.Error(new Error('Could not find #app element'))
        }
    })
}
