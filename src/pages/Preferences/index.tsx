import { Flex, Input, Select, Switch } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai/react'
import { memo, Suspense } from 'react'

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
            <Select
                label="Language"
                defaultValue="en"
                data={[
                    { label: 'English', value: 'en' }
                    // { label: '中文', value: 'zh' }
                ]}
            />
            <Input.Wrapper label="Start at Login">
                <Suspense>
                    <Switch
                        size="md"
                        onLabel="ON"
                        offLabel="OFF"
                        checked={enabled}
                        onChange={event => {
                            setEnabled(event.currentTarget.checked)
                        }}
                    />
                </Suspense>
            </Input.Wrapper>
        </Container>
    )
}

export default memo(Preferences)
