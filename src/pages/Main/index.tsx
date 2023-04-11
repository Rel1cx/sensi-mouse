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
        window.get().show()
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
                        size="lg"
                        marks={marks}
                        min={0}
                        max={100}
                        value={config.sen}
                        onChange={async value => {
                            await setMouseCfg(value, config.accEnabled)
                            setConfig('sen', value)
                        }}
                    />
                </Input.Wrapper>
                <Input.Wrapper label={T.ACCELERATION()}>
                    <SC.xSwitch
                        size="md"
                        onLabel="ON"
                        offLabel="OFF"
                        checked={config.accEnabled}
                        onChange={async event => {
                            const { checked } = event.target
                            await setMouseCfg(config.sen, checked)
                            setConfig('accEnabled', checked)
                        }}
                    />
                </Input.Wrapper>
            </SC.Content>
            <Divider />
            <SC.Footer gap={8} justify="flex-end" align="center">
                <Button onClick={handleOpenPreferences}>{T.PREFERENCES()}</Button>
                <Button
                    onClick={async () => {
                        await setMouseCfg(DEFAULT_SEN, DEFAULT_ACC_ENABLED)
                        setConfig('sen', DEFAULT_SEN)
                        setConfig('accEnabled', DEFAULT_ACC_ENABLED)
                    }}
                >
                    {T.RESET()}
                </Button>
                <Button onClick={() => exit(0)}>{T.QUIT()}</Button>
            </SC.Footer>
        </SC.Container>
    )
}
