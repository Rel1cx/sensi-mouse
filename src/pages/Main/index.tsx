import { Input } from '@mantine/core'
import { exit } from '@tauri-apps/api/process'
import { useAtom } from 'jotai/react'
import { debounce } from 'throttle-debounce'

import { accEnabledAtom, senAtom } from '@/atoms'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Header } from '@/components/Header'
import { DEFAULT_ACC_ENABLED, DEFAULT_SEN } from '@/constants'
import { useTranslation } from '@/i18n'
import { getWebviewWindow } from '@/lib/tauri'
import { resetSettings, setSettingsByKey } from '@/settings'

import * as SC from './styles'

const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
]

export const handleOpenPreferences = async () => {
    const window = await getWebviewWindow('preferences')

    if (window.isSome()) {
        window.get().show()
        return
    }
    // eslint-disable-next-line no-console
    console.error('Failed to get preferences window')
}

const saveSen = debounce(300, async (value: number) => {
    await setSettingsByKey('sen', value)
})

export default function Main() {
    const [sen, setSen] = useAtom(senAtom)
    const [accEnabled, setAccEnabled] = useAtom(accEnabledAtom)

    const T = useTranslation()

    return (
        <SC.Container direction="column" justify="space-between">
            <Header>SensiMouse</Header>
            <SC.Content>
                <Input.Wrapper label={T.SENSITIVITY()}>
                    <SC.xSlider
                        size="lg"
                        marks={marks}
                        min={0}
                        max={100}
                        value={sen}
                        onChange={value => {
                            setSen(value)
                            saveSen(value)
                        }}
                    />
                </Input.Wrapper>
                <Input.Wrapper label={T.ACCELERATION()}>
                    <SC.xSwitch
                        size="md"
                        onLabel="ON"
                        offLabel="OFF"
                        checked={accEnabled}
                        onChange={event => {
                            setAccEnabled(event.target.checked)
                        }}
                    />
                </Input.Wrapper>
            </SC.Content>
            <Divider />
            <SC.Footer gap={8} justify="flex-end" align="center">
                <Button onClick={handleOpenPreferences}>{T.PREFERENCES()}</Button>
                <Button
                    onClick={() => {
                        resetSettings()
                        setSen(DEFAULT_SEN)
                        setAccEnabled(DEFAULT_ACC_ENABLED)
                    }}
                >
                    {T.RESET()}
                </Button>
                <Button onClick={() => exit(0)}>{T.QUIT()}</Button>
            </SC.Footer>
        </SC.Container>
    )
}
