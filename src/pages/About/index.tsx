import { Flex, Image, Text } from '@mantine/core'
import { getName, getVersion } from '@tauri-apps/api/app'
import { useAsync } from 'react-use'

import { styled } from '@/theme'

const Container = styled(Flex, {
    height: '100%',
    padding: '16px'
})

const Link = styled('a', {
    textDecoration: 'underline',
    cursor: 'pointer'
})

export default function About() {
    const { value: name = '' } = useAsync(getName)
    const { value: version = '0.0.0' } = useAsync(getVersion)

    return (
        <Container direction="column" justify="space-between" align="center" gap="0">
            <Image src="/icon.png" alt="logo" height="44px" width="auto" />
            <Text size={14}>{name}</Text>
            <Text size={10}>Version: {version}</Text>
            <Text size={10} align="center">
                Copyright © 2023 Eva1ent{' | '}
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://raw.githubusercontent.com/Nicify/sensi-mouse/main/LICENSE"
                >
                    MIT License
                </Link>
            </Text>
        </Container>
    )
}
