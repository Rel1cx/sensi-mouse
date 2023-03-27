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

const theme: MantineThemeOverride = {
    colorScheme: 'light',
    fontFamily: `var(--base-font-family)`
}

const AppShellScreen = styled('main', {
    width: '100%',
    height: '100%'
})

const MainContent = styled('div', {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden'
})

export const App = () => {
    const route = Router.useRoute(['Main', 'About'])

    const contentView = useMemo(
        () =>
            match(route)
                .with({ name: 'Main' }, () => <Main />)
                .with({ name: 'About' }, () => <About />)
                .otherwise(() => null),
        [route]
    )

    return (
        <MantineProvider withGlobalStyles withCSSVariables theme={theme}>
            <AppShellScreen id="app-shell-screen">
                <Provider store={store}>
                    <MainContent>{contentView}</MainContent>
                </Provider>
            </AppShellScreen>
        </MantineProvider>
    )
}
