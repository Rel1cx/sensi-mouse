import { Checkbox, Flex, Select } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai/react'

import { autoLaunchAtom, setAutoLaunchAtom } from '@/atoms'
import { Header } from '@/components/Header'
import { useLocale, useTranslation } from '@/i18n'
import { isLocale } from '@/i18n/i18n-util'
import { settings } from '@/settings'
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
    const locale = useLocale()
    const T = useTranslation()

    const [enabled] = useAtom(autoLaunchAtom)
    const setEnabled = useSetAtom(setAutoLaunchAtom)

    return (
        <Container direction="column" gap={8} align="stretch">
            <Header>{T.THEME()}</Header>
            <Select
                defaultValue="light"
                data={themes}
                onChange={value => {
                    if (!value) {
                        return
                    }
                    settings.set('theme', value)
                    settings.save()
                }}
            />
            <Header>{T.LANGUAGE()}</Header>
            <Select
                data={languages}
                value={locale}
                onChange={value => {
                    if (!value || !isLocale(value)) {
                        return
                    }
                    settings.set('locale', value)
                    settings.save()
                }}
            />
            <Header>{T.GENERAL()}</Header>
            <Checkbox
                label={T.START_AT_LOGIN()}
                checked={enabled}
                onChange={e => {
                    setEnabled(e.currentTarget.checked)
                }}
            />
        </Container>
    )
}
