import { StrictMode } from "react"

import { App } from "./pages/App"

export function Root() {
    return (
        <StrictMode>
            <App />
        </StrictMode>
    )
}
