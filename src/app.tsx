import { MantineProvider } from '@mantine/core'
import { Provider } from 'jotai/react'
import { lazy, useMemo } from 'react'
import { match } from 'ts-pattern'

import TypesafeI18n from './i18n/i18n-react'
import { loadLocale } from './i18n/i18n-util.sync'
import { Router } from './router'
import { store } from './store'
import { mantineThemetheme, styled } from './theme'

const Main = lazy(() => import('./pages/Main'))
const About = lazy(() => import('./pages/About'))
const Preferences = lazy(() => import('./pages/Preferences'))

const AppShellScreen = styled('main', {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
})

loadLocale('en')

export function App() {
    const route = Router.useRoute(['Main', 'About', 'Preferences'])

    const contentView = useMemo(
        () =>
            match(route)
                .with({ name: 'Main' }, () => <Main />)
                .with({ name: 'About' }, () => <About />)
                .with({ name: 'Preferences' }, () => <Preferences />)
                .otherwise(() => null),
        [route]
    )

    return (
        <TypesafeI18n locale="en">
            <MantineProvider withGlobalStyles theme={mantineThemetheme}>
                <Provider store={store}>
                    <AppShellScreen>{contentView}</AppShellScreen>
                </Provider>
            </MantineProvider>
        </TypesafeI18n>
    )
}
