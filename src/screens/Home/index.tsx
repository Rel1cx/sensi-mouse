import { Input, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'

import { off, on } from '@/helper'
import { fetchState, state } from '@/store'

import * as SC from './styles'

interface HomeProps {}

const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
]

const Home: FC<HomeProps> = () => {
    const data = useSnapshot(state)

    useEffect(() => {
        fetchState()

        on(window, 'focus', fetchState)

        return () => {
            off(window, 'focus', fetchState)
        }
    }, [])

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
                            state.accEnabled = event.target.checked
                        }}
                    />
                </Input.Wrapper>
            </SC.Content>
            <SC.xDivider color="#7f828c" />
            <SC.Footer>
                <Text>More Settings...</Text>
            </SC.Footer>
        </SC.Container>
    )
}

export default Home
