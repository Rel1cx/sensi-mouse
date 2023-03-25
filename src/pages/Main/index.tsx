import { Input, Text } from '@mantine/core'
import { useSnapshot } from 'valtio'

import { state, updateAccEnabled, updateSen } from '@/store'

import * as SC from './styles'

const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
]

const Main = () => {
    const data = useSnapshot(state)

    return (
        <SC.Container>
            <SC.Header>SensiMouse</SC.Header>
            <SC.Content>
                <Input.Wrapper label="Sensitivity">
                    <SC.xSlider
                        size="lg"
                        labelAlwaysOn
                        marks={marks}
                        min={0}
                        max={100}
                        value={data.sen}
                        onChange={updateSen}
                        styles={theme => ({
                            markLabel: {
                                color: '#55585f'
                            }
                        })}
                    />
                </Input.Wrapper>
                <Input.Wrapper label="Acceleration">
                    <SC.xSwitch
                        size="md"
                        onLabel="ON"
                        offLabel="OFF"
                        checked={data.accEnabled}
                        onChange={event => {
                            updateAccEnabled(event.target.checked)
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
