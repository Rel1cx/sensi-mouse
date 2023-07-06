import { Text } from "@mantine/core"
import { getName, getVersion } from "@tauri-apps/api/app"
import * as React from "react"
import { useAsync } from "react-use"

import * as css from "./styles.css"

const About = React.memo(() => {
    const { value: name = "" } = useAsync(getName)
    const { value: version = "0.0.0" } = useAsync(getVersion)

    return (
        <div className={css.container}>
            <img alt="logo" height="44px" src="/icon.png" width="auto" />
            <Text size="12px">{name}</Text>
            <Text size="10px">Version: {version}</Text>
            <Text size="10px" align="center">
                Copyright © 2023 Eva1ent{" | "}
                <a
                    className={css.link}
                    href="https://raw.githubusercontent.com/Rel1cx/sensi-mouse/main/LICENSE"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    MIT License
                </a>
            </Text>
        </div>
    )
})

export default About
