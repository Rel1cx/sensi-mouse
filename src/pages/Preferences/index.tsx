import { Checkbox, Flex, Select } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai/react'
import { memo } from 'react'

import { Header } from '@/components/Header'
import { autoLaunchAtom, setAutoLaunchAtom } from '@/store'
import { styled } from '@/theme'

const themes = [
    { label: 'Light', value: 'light' }
    // { label: 'Dark', value: 'dark' }
]

const languages = [
    { label: 'English', value: 'en' }
    // { label: '中文', value: 'zh' }
]

type PreferenceProps = {
    // ...
}

const Container = styled(Flex, {
    padding: '16px 12px'
})

const Preferences = () => {
    const [enabled] = useAtom(autoLaunchAtom)
    const setEnabled = useSetAtom(setAutoLaunchAtom)

    return (
        <Container direction="column" gap={8} align="stretch">
            <Header>Theme</Header>
            <Select defaultValue="light" data={themes} />
            <Header>Language</Header>
            <Select defaultValue="en" data={languages} />
            <Header>General</Header>
            <Checkbox label="Start at Login" checked={enabled} onChange={e => setEnabled(e.currentTarget.checked)} />
        </Container>
    )
}

export default memo(Preferences)
