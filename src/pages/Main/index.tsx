import { Input } from '@mantine/core'
import { exit } from '@tauri-apps/api/process'
import { debounce } from 'throttle-debounce'

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

const dSetMouseCfg = debounce(50, setMouseCfg, {
    atBegin: false
})

export default function Main() {
    const T = useTranslation()

    const config = configManager.useConfig()

    return (
        <SC.Container direction="column" justify="space-between">
            <Header>SensiMouse</Header>
            <SC.Content>
                <Input.Wrapper label={T.SENSITIVITY()}>
                    <SC.xSlider
                        marks={marks}
                        max={100}
                        min={0}
                        onChange={value => {
                            void configManager.setConfig('sen', value)
                            dSetMouseCfg(value, config.accEnabled)
                        }}
                        size="lg"
                        value={config.sen}
                    />
                </Input.Wrapper>
                <Input.Wrapper label={T.ACCELERATION()}>
                    <SC.xSwitch
                        checked={config.accEnabled}
                        offLabel="OFF"
                        onChange={event => {
                            const { checked } = event.target
                            void configManager.setConfig('accEnabled', checked)
                            dSetMouseCfg(config.sen, checked)
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
                        await configManager.setConfig('sen', DEFAULT_SEN)
                        await configManager.setConfig('accEnabled', DEFAULT_ACC_ENABLED)
                    }}
                >
                    {T.RESET()}
                </Button>
                <Button onClick={() => void exit(0)}>{T.QUIT()}</Button>
            </SC.Footer>
        </SC.Container>
    )
}
