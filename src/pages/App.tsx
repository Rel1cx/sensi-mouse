import { lazy, Suspense, useMemo } from "react"
import * as React from "react"
import { match } from "ts-pattern"

import { Router } from "@/router"

import * as css from "./App.css"

const Main = lazy(() => import("./Main/Main"))
const About = lazy(() => import("./About/About"))
const Preferences = lazy(() => import("./Preferences/Preferences"))

export const App = React.memo(() => {
    const route = Router.useRoute(["Main", "About", "Preferences"])

    return (
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
    )
})
