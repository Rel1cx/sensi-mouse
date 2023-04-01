import { type MantineThemeOverride } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'jotai/react'
import { lazy, useMemo } from 'react'
import { match } from 'ts-pattern'

import { Router } from './router'
import { store } from './store'
import { styled } from './theme'

const Main = lazy(() => import('./pages/Main'))
const About = lazy(() => import('./pages/About'))
const Preferences = lazy(() => import('./pages/Preferences'))

const theme: MantineThemeOverride = {
    colorScheme: 'light',
    fontFamily: `var(--base-font-family)`,
    headings: {
        fontFamily: `var(--base-font-family)`
    },
    colors: {
        light: []
    },
    primaryColor: ''
}

const AppShellScreen = styled('main', {
    width: '100%',
    height: '100%'
})

const MainContent = styled('div', {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
})

export const App = () => {
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
        <MantineProvider withGlobalStyles theme={theme}>
            <AppShellScreen id="app-shell-screen">
                <Provider store={store}>
                    <MainContent>{contentView}</MainContent>
                </Provider>
            </AppShellScreen>
        </MantineProvider>
    )
}
