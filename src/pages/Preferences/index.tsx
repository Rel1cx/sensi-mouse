import { Flex, Input, Select, Switch } from '@mantine/core'
import { memo } from 'react'

import { styled } from '@/theme'

type PreferenceProps = {
    // ...
}

const Container = styled(Flex, {
    padding: '16px 12px'
})

const Preferences = () => {
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
                <Switch
                    size="md"
                    onLabel="ON"
                    offLabel="OFF"
                    onChange={event => {
                        console.log(event.target.checked)
                    }}
                />
            </Input.Wrapper>
        </Container>
    )
}

export default memo(Preferences)
