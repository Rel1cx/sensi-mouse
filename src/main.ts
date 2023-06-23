import "@total-typescript/ts-reset"

import { enableMapSet, setAutoFreeze } from "immer"
import React from "react"
import { createRoot } from "react-dom/client"

import { loadConfig, loadDefaultConfig } from "./atoms"
import { Root } from "./root"

enableMapSet()
setAutoFreeze(true)

const main = async () => {
    await loadConfig().catch(loadDefaultConfig)

    const root = document.querySelector("#root")

    if (!root) {
        throw new Error("Root element not found")
    }

    createRoot(root).render(React.createElement(Root))
}

void main()
