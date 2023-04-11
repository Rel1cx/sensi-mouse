import { Checkbox, Flex, Select } from '@mantine/core'
import { useMemo } from 'react'
import * as autostart from 'tauri-plugin-autostart-api'

import { Header } from '@/components/Header'
import { configManager } from '@/config'
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

const Container = styled(Flex, {
    padding: '16px 12px'
})

export default function Preferences() {
    const locale = useLocale()
    const T = useTranslation()

    const [config, setConfig] = configManager.useConfig()

    const handlers = useMemo(
        () => ({
            handleLocaleChange: (value: string) => {
                if (!value || !isLocale(value)) {
                    return
                }
                void setConfig('locale', value)
            },
            // handleThemeChange: (value: string) => {},
            handleStartAtLoginChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
                const { checked } = event.target
                await (checked ? autostart.enable : autostart.disable)()
                await setConfig('launchAtLogin', checked)
            }
        }),
        [setConfig]
    )

    return (
        <Container align="stretch" direction="column" gap={8}>
            <Header>{T.THEME()}</Header>
            <Select data={themes} defaultValue="light" />
            <Header>{T.LANGUAGE()}</Header>
            <Select data={languages} onChange={handlers.handleLocaleChange} value={locale} />
            <Header>{T.GENERAL()}</Header>
            <Checkbox
                checked={config.launchAtLogin}
                label={T.START_AT_LOGIN()}
                onChange={handlers.handleStartAtLoginChange}
            />
        </Container>
    )
}
