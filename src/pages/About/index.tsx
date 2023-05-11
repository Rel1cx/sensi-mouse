import { Flex, Image, Text } from '@mantine/core'
import { getName, getVersion } from '@tauri-apps/api/app'
import { useAsync } from 'react-use'

import { styled } from '@/theme'

const Container = styled(Flex, {
    padding: '16px',
    height: '100%',
})

const Link = styled('a', {
    cursor: 'pointer',
    textDecoration: 'underline',
})

export default function About() {
    const { value: name = '' } = useAsync(getName)
    const { value: version = '0.0.0' } = useAsync(getVersion)

    return (
        <Container align='center' direction='column' gap='0' justify='space-between'>
            <Image alt='logo' height='44px' src='/icon.png' width='auto' />
            <Text size={14}>{name}</Text>
            <Text size={10}>Version: {version}</Text>
            <Text align='center' size={10}>
                Copyright © 2023 Eva1ent{' | '}
                <Link
                    href='https://raw.githubusercontent.com/Rel1cx/sensi-mouse/main/LICENSE'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    MIT License
                </Link>
            </Text>
        </Container>
    )
}
