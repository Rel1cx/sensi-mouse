import { Checkbox, Flex, Select } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai/react'

import { Header } from '@/components/Header'
import { useI18nContext } from '@/i18n/i18n-react'
import { isLocale } from '@/i18n/i18n-util'
import { settings } from '@/lib/settings'
import { autoLaunchAtom, setAutoLaunchAtom } from '@/store'
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
    const { locale, LL } = useI18nContext()

    const [enabled] = useAtom(autoLaunchAtom)
    const setEnabled = useSetAtom(setAutoLaunchAtom)

    return (
        <Container direction="column" gap={8} align="stretch">
            <Header>{LL.THEME()}</Header>
            <Select defaultValue="light" data={themes} />
            <Header>{LL.LANGUAGE()}</Header>
            <Select
                defaultValue="en"
                data={languages}
                value={locale}
                onChange={value => {
                    if (!value || !isLocale(value)) {
                        return
                    }
                    settings.set('locale', value)
                }}
            />
            <Header>{LL.GENERAL()}</Header>
            <Checkbox
                label={LL.START_AT_LOGIN()}
                checked={enabled}
                onChange={e => setEnabled(e.currentTarget.checked)}
            />
        </Container>
    )
}
