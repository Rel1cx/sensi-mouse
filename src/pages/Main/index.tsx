import { Input } from '@mantine/core'
import { exit } from '@tauri-apps/api/process'

import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Header } from '@/components/Header'
import { configManager } from '@/config'
import { DEFAULT_ACC_ENABLED, DEFAULT_SEN } from '@/constants'
import { useTranslation } from '@/hooks/useI18n'
import { setMouseCfg } from '@/lib/cmd'
import { getWebviewWindow } from '@/lib/tauri'

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
        await window.get().show()
        return
    }
    // eslint-disable-next-line no-console
    console.error('Failed to get preferences window')
}

export default function Main() {
    const T = useTranslation()

    const [config, setConfig] = configManager.useConfig()

    return (
        <SC.Container direction="column" justify="space-between">
            <Header>SensiMouse</Header>
            <SC.Content>
                <Input.Wrapper label={T.SENSITIVITY()}>
                    <SC.xSlider
                        marks={marks}
                        max={100}
                        min={0}
                        onChange={async value => {
                            await setMouseCfg(value, config.accEnabled)
                            await setConfig('sen', value)
                        }}
                        size="lg"
                        value={config.sen}
                    />
                </Input.Wrapper>
                <Input.Wrapper label={T.ACCELERATION()}>
                    <SC.xSwitch
                        checked={config.accEnabled}
                        offLabel="OFF"
                        onChange={async event => {
                            const { checked } = event.target
                            await setMouseCfg(config.sen, checked)
                            await setConfig('accEnabled', checked)
                        }}
                        onLabel="ON"
                        size="md"
                    />
                </Input.Wrapper>
            </SC.Content>
            <Divider />
            <SC.Footer align="center" gap={8} justify="flex-end">
                <Button onClick={() => void handleOpenPreferences()}>{T.PREFERENCES()}</Button>
                <Button
                    onClick={async () => {
                        await setMouseCfg(DEFAULT_SEN, DEFAULT_ACC_ENABLED)
                        await setConfig('sen', DEFAULT_SEN)
                        await setConfig('accEnabled', DEFAULT_ACC_ENABLED)
                    }}
                >
                    {T.RESET()}
                </Button>
                <Button onClick={() => void exit(0)}>{T.QUIT()}</Button>
            </SC.Footer>
        </SC.Container>
    )
}
