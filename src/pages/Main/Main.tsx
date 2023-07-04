import { Divider, Input, Slider, Switch } from "@mantine/core"
import { exit } from "@tauri-apps/api/process"
import { WebviewWindow } from "@tauri-apps/api/window"
import { useAtom, useSetAtom } from "jotai"

import { accEnabledAtom, loadDefaultConfig, senAtom, setAccEnabledAtom, setSenAtom } from "@/atoms"
import { Button } from "@/components/Button/Button"
import { Title } from "@/components/Title/Title"
import { useTranslation } from "@/hooks/useTranslation"

import * as css from "./styles.css"

const marks = [
    { label: "0", value: 0 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "75", value: 75 },
    { label: "100", value: 100 },
]

const handleOpenPreferences = async () => {
    const window = WebviewWindow.getByLabel("preferences")

    if (window) {
        await window.show()
        await window.setFocus()
        return
    }
    // eslint-disable-next-line no-console
    console.error("Failed to get preferences window")
}

const Main = () => {
    const T = useTranslation()

    const [sen] = useAtom(senAtom)
    const setSen = useSetAtom(setSenAtom)

    const [accEnabled] = useAtom(accEnabledAtom)
    const setAccEnabled = useSetAtom(setAccEnabledAtom)

    return (
        <main className={css.container}>
            <Title>SensiMouse</Title>
            <div className={css.content}>
                <Input.Wrapper label={T.SENSITIVITY()}>
                    <Slider
                        className={css.xSlider}
                        marks={marks}
                        max={100}
                        min={0}
                        onChange={setSen}
                        size="lg"
                        value={sen}
                    />
                </Input.Wrapper>
                <Input.Wrapper label={T.ACCELERATION()}>
                    <Switch
                        className={css.xSwitch}
                        checked={accEnabled}
                        offLabel="OFF"
                        onChange={async (event) => {
                            const { checked } = event.target
                            await setAccEnabled(checked)
                        }}
                        onLabel="ON"
                        size="md"
                    />
                </Input.Wrapper>
            </div>
            <Divider my={4} />
            <footer className={css.footer}>
                <Button onClick={handleOpenPreferences}>{T.PREFERENCES()}</Button>
                <Button onClick={loadDefaultConfig}>{T.RESET()}</Button>
                <Button onClick={() => void exit(0)}>{T.QUIT()}</Button>
            </footer>
        </main>
    )
}

export default Main
