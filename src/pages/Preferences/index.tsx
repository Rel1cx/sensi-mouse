import { Checkbox, Flex, Select } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai/react'

import { Header } from '@/components/Header'
import { isLocale } from '@/i18n/i18n-util'
import { useTrans } from '@/lib/i18n'
import { settings } from '@/lib/settings'
import { autoLaunchAtom, setAutoLaunchAtom, useLang } from '@/store'
import { styled } from '@/theme'

const themes = [
    { label: 'Light', value: 'light' }
    // { label: 'Dark', value: 'dark' }
]

const languages = [
    { label: 'English', value: 'en' },
    { label: '中文', value: 'zh' }
]

type PreferenceProps = {
    // ...
}

const Container = styled(Flex, {
    padding: '16px 12px'
})

export default function Preferences() {
    const [lang] = useLang()
    const T = useTrans()

    const [enabled] = useAtom(autoLaunchAtom)
    const setEnabled = useSetAtom(setAutoLaunchAtom)

    return (
        <Container direction="column" gap={8} align="stretch">
            <Header>{T.THEME()}</Header>
            <Select defaultValue="light" data={themes} />
            <Header>{T.LANGUAGE()}</Header>
            <Select
                data={languages}
                value={lang}
                onChange={value => {
                    if (!value || !isLocale(value)) {
                        return
                    }
                    settings.set('locale', value)
                }}
            />
            <Header>{T.GENERAL()}</Header>
            <Checkbox
                label={T.START_AT_LOGIN()}
                checked={enabled}
                onChange={e => setEnabled(e.currentTarget.checked)}
            />
        </Container>
    )
}
