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
            <SC.Title>Flat Mouse</SC.Title>
            <SC.Controls>
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
            </SC.Controls>
            <SC.xDivider color="#7f828c95" />
            <Text
                sx={{
                    fontSize: '12px',
                    opacity: 0.8
                }}
                size="sm"
            >
                Made with ❤️ by @Eva1ent
            </Text>
        </SC.Container>
    )
}

export default Home
