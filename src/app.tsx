import type { MantineThemeOverride } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import type { DefaultGenerics, Route } from '@tanstack/react-location'
import { Outlet, Router } from '@tanstack/react-location'
import { lazy } from 'react'

import { location } from './router'
import { styled } from './theme'

const Main = lazy(() => import('./pages/Main'))
const About = lazy(() => import('./pages/About'))

const theme: MantineThemeOverride = {
    colorScheme: 'light'
}

const AppShellScreen = styled('main', {
    width: '100%',
    height: '100%'
})

const MainContent = styled('div', {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden'
})

export const routes: Route[] = [
    { path: '/', element: <Main /> },
    { path: '/about', element: <About /> }
]

export const App = () => {
    return (
        <MantineProvider withGlobalStyles withCSSVariables theme={theme}>
            <AppShellScreen id="app-shell-screen">
                <MainContent>
                    <Router location={location} routes={routes}>
                        <Outlet />
                    </Router>
                </MainContent>
            </AppShellScreen>
        </MantineProvider>
    )
}
