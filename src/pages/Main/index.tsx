import { Input, Text } from '@mantine/core'
import { invoke } from '@tauri-apps/api/tauri'
import { useSnapshot } from 'valtio'

import { state } from '@/store'

import * as SC from './styles'

interface MainProps {}

const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
]

const Main: FC<MainProps> = () => {
    const data = useSnapshot(state)

    return (
        <SC.Container>
            <SC.Header>Pointer Sense</SC.Header>
            <SC.Content>
                <Input.Wrapper label="Sensitivity">
                    <SC.xSlider
                        size="lg"
                        labelAlwaysOn
                        marks={marks}
                        min={0}
                        max={100}
                        value={data.sen}
                        onChange={value => {
                            state.sen = value
                            invoke('set_mouse_cfg', { sen: value, accEnabled: data.accEnabled })
                        }}
                    />
                </Input.Wrapper>
                <Input.Wrapper label="Acceleration">
                    <SC.xSwitch
                        size="md"
                        onLabel="ON"
                        offLabel="OFF"
                        checked={data.accEnabled}
                        onChange={event => {
                            const { checked } = event.target
                            state.accEnabled = checked
                            invoke('set_mouse_cfg', { sen: data.sen, accEnabled: checked })
                        }}
                    />
                </Input.Wrapper>
            </SC.Content>
            <SC.xDivider color="#7f828c" />
            <SC.Footer>
                <Text size={14}>More Settings...</Text>
            </SC.Footer>
        </SC.Container>
    )
}

Main.displayName = 'Main'

export default Main
