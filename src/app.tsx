import type { MantineThemeOverride } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { invoke } from '@tauri-apps/api/tauri'

import Home from './screens/Home'
import { styled } from './theme'

const theme: MantineThemeOverride = {
    colorScheme: 'light'
}

const AppShellScreen = styled('main', {
    width: '100%',
    height: '100%',
    padding: '4px'
})

const MainContent = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#2ac'
})

export const App = () => {
    return (
        <MantineProvider withGlobalStyles withCSSVariables theme={theme}>
            <AppShellScreen id="app-shell-screen">
                <MainContent>
                    <Home />
                </MainContent>
            </AppShellScreen>
        </MantineProvider>
    )
}
