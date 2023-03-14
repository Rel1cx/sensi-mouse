import type { MantineThemeOverride } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { styled } from '@stitches/react'
import { invoke } from '@tauri-apps/api/tauri'

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export const App = () => {
    return (
        <MantineProvider withGlobalStyles withCSSVariables theme={theme}>
            <AppShellScreen id="app-shell-screen">
                <MainContent />
            </AppShellScreen>
        </MantineProvider>
    )
}
