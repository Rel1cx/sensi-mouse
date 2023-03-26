import { Image, Text } from '@mantine/core'
import { getName, getVersion } from '@tauri-apps/api/app'
import { useAsync } from 'react-use'

import { styled } from '@/theme'

const Container = styled('div', {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: '8px 16px'
})

const About = () => {
    const { value: name = '' } = useAsync(getName)
    const { value: version = '0.0.0' } = useAsync(getVersion)

    return (
        <Container>
            <Image src="/icon.png" alt="logo" height="44px" width="auto" />
            <Text size={14}>{name}</Text>
            <Text size={10}>Version: {version}</Text>
            <Text size={10} align="center">
                Copyright © 2023 Eva1ent. All rights reserved.
            </Text>
        </Container>
    )
}

export default About
