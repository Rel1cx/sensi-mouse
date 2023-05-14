import { MantineProvider } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import { lazy, useMemo } from "react"
import { match } from "ts-pattern"

import { Router } from "./router"
import { mantineThemetheme, styled } from "./theme"

const Main = lazy(() => import("./pages/Main"))
const About = lazy(() => import("./pages/About"))
const Preferences = lazy(() => import("./pages/Preferences"))

const AppShellScreen = styled("main", {
    width: "100%",
    height: "100%",
    overflow: "hidden",
})

export const App = () => {
    const route = Router.useRoute(["Main", "About", "Preferences"])

    const preferredColorScheme = useColorScheme()

    const theme = useMemo(() => mantineThemetheme(preferredColorScheme), [preferredColorScheme])

    return (
        <MantineProvider theme={theme} withGlobalStyles>
            <AppShellScreen>
                {useMemo(
                    () =>
                        match(route)
                            .with({ name: "Main" }, () => <Main />)
                            .with({ name: "About" }, () => <About />)
                            .with({ name: "Preferences" }, () => <Preferences />)
                            .otherwise(() => null),
                    [route],
                )}
            </AppShellScreen>
        </MantineProvider>
    )
}
