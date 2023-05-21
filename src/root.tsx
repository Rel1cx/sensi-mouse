import "ress/ress.css"
import "@/styles/global.scss"
import "@/styles/overrides.scss"

import { MantineProvider } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import { StrictMode, useMemo } from "react"

import { App } from "./pages/App"
import { mantineTheme } from "./theme/mantine.config"

export const Root = () => {
    const preferredColorScheme = useColorScheme()

    const theme = useMemo(() => ({ ...mantineTheme, colorScheme: preferredColorScheme }), [preferredColorScheme])

    return (
        <StrictMode>
            <MantineProvider theme={theme} withGlobalStyles>
                <App />
            </MantineProvider>
        </StrictMode>
    )
}
