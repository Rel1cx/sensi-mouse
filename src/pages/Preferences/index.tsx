import { Checkbox, Flex, Select } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai/react'
import { memo } from 'react'

import { Header } from '@/components/Header'
import { autoLaunchAtom, setAutoLaunchAtom } from '@/store'
import { styled } from '@/theme'

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
            <Header>Interface</Header>
            <Select
                defaultValue="en"
                data={[
                    { label: 'English', value: 'en' }
                    // { label: '中文', value: 'zh' }
                ]}
            />
            <Header>General</Header>
            <Checkbox label="Start at Login" checked={enabled} onChange={e => setEnabled(e.currentTarget.checked)} />
        </Container>
    )
}

export default memo(Preferences)
