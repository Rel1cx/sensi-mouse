import "@total-typescript/ts-reset"

import { enableMapSet, setAutoFreeze, setUseStrictShallowCopy } from "immer"
import React from "react"
import { createRoot } from "react-dom/client"

import { loadConfigToAtom, loadDefaultConfigToAtom } from "./atoms"
import { Root } from "./root"

enableMapSet()
setAutoFreeze(true)
setUseStrictShallowCopy(true)

const main = async () => {
    await loadConfigToAtom().catch(loadDefaultConfigToAtom)

    const root = document.querySelector("#root")

    if (root === null) {
        throw new Error("Root element not found")
    }

    createRoot(root).render(React.createElement(Root))
}

void main()
