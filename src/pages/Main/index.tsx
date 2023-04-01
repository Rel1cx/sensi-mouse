import { Input } from '@mantine/core'
import { useAtom } from 'jotai/react'

import { Button } from '@/components/Button'
import { getWebviewWindow } from '@/lib/tauri'
import { accEnabledAtom, senAtom } from '@/store'

import * as SC from './styles'

const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
]

function Main() {
    const [sen, setSen] = useAtom(senAtom)
    const [accEnabled, setAccEnabled] = useAtom(accEnabledAtom)

    return (
        <SC.Container direction="column" justify="space-between">
            <SC.Header>SensiMouse</SC.Header>
            <SC.Content>
                <Input.Wrapper label="Sensitivity">
                    <SC.xSlider size="lg" marks={marks} min={0} max={100} value={sen} onChange={setSen} />
                </Input.Wrapper>
                <Input.Wrapper label="Acceleration">
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
            <SC.xDivider color="#cccccc" />
            <SC.Footer gap={8} justify="flex-end" align="center">
                <Button
                    onClick={() => {
                        getWebviewWindow('preferences').then(window =>
                            window.match({
                                Some: window => window.show(),
                                None: () => {
                                    // eslint-disable-next-line no-console
                                    console.error('Failed to get preferences window')
                                }
                            })
                        )
                    }}
                >
                    Preferences
                </Button>
                <Button>Reset</Button>
                <Button>Quit</Button>
            </SC.Footer>
        </SC.Container>
    )
}

export default Main
