import { MantineProvider } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import React, { lazy, Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import { Router } from "@/router"
import { mantineTheme } from "@/theme/mantine.config"

import * as css from "./App.css"

const Main = lazy(() => import("./Main/Main"))
const About = lazy(() => import("./About/About"))
const Preferences = lazy(() => import("./Preferences/Preferences"))

export const App = React.memo(() => {
    const preferredColorScheme = useColorScheme()

    const theme = useMemo(() => ({ ...mantineTheme, colorScheme: preferredColorScheme }), [preferredColorScheme])

    const route = Router.useRoute(["Main", "About", "Preferences"])

    return (
        <MantineProvider theme={theme} withGlobalStyles>
            <main className={css.appShellScreen}>
                <Suspense>
                    {useMemo(
                        () =>
                            match(route)
                                .with({ name: "Main" }, () => <Main />)
                                .with({ name: "About" }, () => <About />)
                                .with({ name: "Preferences" }, () => <Preferences />)
                                .otherwise(() => null),
                        [route],
                    )}
                </Suspense>
            </main>
        </MantineProvider>
    )
})
