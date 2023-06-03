import "@total-typescript/ts-reset"

import { Option as O, Task } from "ftld"
import { enableMapSet, setAutoFreeze, setUseStrictShallowCopy } from "immer"
import React from "react"
import { createRoot } from "react-dom/client"

import { loadConfigToAtom, loadDefaultConfigToAtom } from "./atoms"
import { Root } from "./root"

enableMapSet()
setAutoFreeze(true)
setUseStrictShallowCopy(true)

const main = async () => {
    const load = Task.from(loadConfigToAtom).tapErr(loadDefaultConfigToAtom)

    await load.run()

    O.from(document.querySelector("#root"))
        .result()
        .map(createRoot)
        .tap((root) => {
            root.render(React.createElement(Root))
        })
        .tapErr(console.error)
}

void main()
