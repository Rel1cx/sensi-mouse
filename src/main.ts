import "@total-typescript/ts-reset"

import { Option as O, Result as R } from "@swan-io/boxed"
import { enableMapSet, setAutoFreeze, setUseStrictShallowCopy } from "immer"
import React from "react"
import { createRoot } from "react-dom/client"

import { loadConfigToAtom, loadDefaultConfigToAtom } from "./atoms"
import { configManager } from "./config"
import { Root } from "./root"

enableMapSet()
setAutoFreeze(true)
setUseStrictShallowCopy(true)

const main = async () => {
    await R.fromPromise(loadConfigToAtom()).then((r) => {
        r.match({
            Ok: () => {},
            Error: async () => {
                await configManager.resetConfig()
                await loadDefaultConfigToAtom()
            },
        })
    })

    O.fromNullable(document.querySelector("#root"))
        .map(createRoot)
        .map((root) => {
            root.render(React.createElement(Root))
        })
        .toResult(new Error("Could not find element with selector: #root"))
        .match({
            Ok: () => {
                // window.addEventListener("focus", loadConfigToAtom)
                // if (import.meta.env.DEV) {
                //     return
                // }
                // document.addEventListener("contextmenu", (event) => void event.preventDefault(), {
                //     capture: true,
                // })
            },
            // eslint-disable-next-line no-console
            Error: console.error,
        })
}

void main()
