import "ress/ress.css"
import "@/styles/global.scss"
import "@/styles/overrides.scss"
import "@total-typescript/ts-reset"
import "./polyfill"

import React from "react"
import { createRoot } from "react-dom/client"

import { loadConfig, loadDefaultConfig } from "./atoms"
import { Root } from "./root"

const main = async () => {
    await loadConfig().catch(loadDefaultConfig)

    const root = document.querySelector("#root")

    if (!root) {
        throw new Error("Root element not found")
    }

    createRoot(root).render(React.createElement(Root))
}

void main()
