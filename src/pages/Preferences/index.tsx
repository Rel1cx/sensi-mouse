import { Checkbox, Flex, NativeSelect } from '@mantine/core'
import { useMemo } from 'react'
import * as autostart from 'tauri-plugin-autostart-api'

import { Header } from '@/components/Header'
import { configManager } from '@/config'
import { useLocale, useTranslation } from '@/hooks/useI18n'
import { type Locales } from '@/i18n/i18n-types'
import { isLocale } from '@/i18n/i18n-util'
import { styled } from '@/theme'
import { type Theme } from '@/types'

const themes: { label: string, value: Theme }[] = [
    { label: 'Light', value: 'light' }
    // { label: 'Dark', value: 'dark' }
]

const languages: { label: string, value: Locales }[] = [
    { label: 'Deutsch', value: 'de' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Italiano', value: 'it' },
    { label: '日本語', value: 'ja' },
    { label: '한국어', value: 'ko' },
    { label: 'Português', value: 'pt' },
    { label: 'Русский', value: 'ru' },
    { label: '简体中文', value: 'zh-CN' },
    { label: '繁體中文', value: 'zh-TW' },
    { label: 'Türkçe', value: 'tr' }
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
            handleLocaleChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
                const { value } = event.target
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
            <NativeSelect data={themes} defaultValue="light" />
            <Header>{T.LANGUAGE()}</Header>
            <NativeSelect data={languages} onChange={handlers.handleLocaleChange} value={locale} />
            <Header>{T.GENERAL()}</Header>
            <Checkbox
                checked={config.launchAtLogin}
                label={T.START_AT_LOGIN()}
                onChange={handlers.handleStartAtLoginChange}
            />
        </Container>
    )
}
