import { Input, Text } from '@mantine/core'
import { useAtom } from 'jotai/react'

import { accEnabledAtom, senAtom } from '@/store'

import * as SC from './styles'

const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
]

const Main = () => {
    const [sen, setSen] = useAtom(senAtom)
    const [accEnabled, setAccEnabled] = useAtom(accEnabledAtom)

    return (
        <SC.Container>
            <SC.Header>SensiMouse</SC.Header>
            <SC.Content>
                <Input.Wrapper label="Sensitivity">
                    <SC.xSlider
                        size="lg"
                        marks={marks}
                        min={0}
                        max={100}
                        value={sen}
                        onChange={setSen}
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
                        checked={accEnabled}
                        onChange={event => {
                            setAccEnabled(event.target.checked)
                        }}
                    />
                </Input.Wrapper>
            </SC.Content>
            <SC.xDivider color="#cccccc" />
            <SC.Footer>
                <Text size={14} color="#252525">
                    More Settings...
                </Text>
            </SC.Footer>
        </SC.Container>
    )
}

export default Main
