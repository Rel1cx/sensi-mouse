import { Input } from '@mantine/core'
import { exit } from '@tauri-apps/api/process'
import { useAtom, useSetAtom } from 'jotai'

import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Header } from '@/components/Header'
import { useTranslation } from '@/hooks/useI18n'
import { getWebviewWindow } from '@/lib/tauri'
import { accEnabledAtom, resetConfigAtom, senAtom, setAccEnabledAtom, setSenAtom } from '@/store'

import * as SC from './styles'

const marks = [
    { label: '0', value: 0 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '75', value: 75 },
    { label: '100', value: 100 }
]

const handleOpenPreferences = async () => {
    const window = await getWebviewWindow('preferences')

    if (window.isSome()) {
        await window.get().show()
        await window.get().setFocus()
        return
    }
    // eslint-disable-next-line no-console
    console.error('Failed to get preferences window')
}

export default function Main() {
    const T = useTranslation()

    const [sen] = useAtom(senAtom)
    const setSen = useSetAtom(setSenAtom)

    const [accEnabled] = useAtom(accEnabledAtom)
    const setAccEnabled = useSetAtom(setAccEnabledAtom)

    return (
        <SC.Container direction="column" justify="space-between">
            <Header>SensiMouse</Header>
            <SC.Content>
                <Input.Wrapper label={T.SENSITIVITY()}>
                    <SC.xSlider marks={marks} max={100} min={0} onChange={setSen} size="lg" value={sen} />
                </Input.Wrapper>
                <Input.Wrapper label={T.ACCELERATION()}>
                    <SC.xSwitch
                        checked={accEnabled}
                        offLabel="OFF"
                        onChange={async event => {
                            const { checked } = event.target
                            await setAccEnabled(checked)
                        }}
                        onLabel="ON"
                        size="md"
                    />
                </Input.Wrapper>
            </SC.Content>
            <Divider />
            <SC.Footer align="center" gap={8} justify="flex-end">
                <Button onClick={handleOpenPreferences}>{T.PREFERENCES()}</Button>
                <Button onClick={resetConfigAtom}>{T.RESET()}</Button>
                <Button onClick={() => exit(0)}>{T.QUIT()}</Button>
            </SC.Footer>
        </SC.Container>
    )
}
