import { Checkbox, Flex, Select } from '@mantine/core'
import * as autostart from 'tauri-plugin-autostart-api'

import { Header } from '@/components/Header'
import { useConfig } from '@/config'
import { useLocale, useTranslation } from '@/hooks/useI18n'
import { isLocale } from '@/i18n/i18n-util'
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

    const [config, setConfig] = useConfig()

    return (
        <Container direction="column" gap={8} align="stretch">
            <Header>{T.THEME()}</Header>
            <Select defaultValue="light" data={themes} />
            <Header>{T.LANGUAGE()}</Header>
            <Select
                data={languages}
                value={locale}
                onChange={value => {
                    if (!value || !isLocale(value)) {
                        return
                    }
                    setConfig('locale', value)
                }}
            />
            <Header>{T.GENERAL()}</Header>
            <Checkbox
                label={T.START_AT_LOGIN()}
                checked={config.launchAtLogin}
                onChange={async event => {
                    const { checked } = event.target
                    checked ? await autostart.enable() : await autostart.disable()
                    setConfig('launchAtLogin', checked)
                }}
            />
        </Container>
    )
}
