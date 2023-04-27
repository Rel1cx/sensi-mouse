import { Checkbox, Flex, NativeSelect } from '@mantine/core'
import * as autostart from 'tauri-plugin-autostart-api'

import { Header } from '@/components/Header'
import { configManager } from '@/config'
import { useLocale, useTranslation } from '@/hooks/useI18n'
import { type Locales } from '@/i18n/i18n-types'
import { isLocale } from '@/i18n/i18n-util'
import { styled } from '@/theme'
import { isTheme, Theme } from '@/types'

const themes: { label: string; value: Theme }[] = [
    { label: 'Light', value: Theme.light },
    { label: 'Dark', value: Theme.dark }
]

const languages: { label: string; value: Locales }[] = [
    { label: 'Deutsch', value: 'de' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Italiano', value: 'it' },
    { label: '日本語', value: 'ja' },
    { label: '한국어', value: 'ko' },
    { label: 'Português', value: 'pt' },
    { label: 'Русский', value: 'ru' },
    { label: 'Türkçe', value: 'tr' },
    { label: '简体中文', value: 'zh-CN' },
    { label: '繁體中文', value: 'zh-TW' }
]

const Container = styled(Flex, {
    padding: '16px 12px'
})

const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (!value || !isTheme(value)) {
        return
    }
    void configManager.setConfig('theme', value)
}

const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (!value || !isLocale(value)) {
        return
    }
    void configManager.setConfig('locale', value)
}

const handleStartAtLoginChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    await (checked ? autostart.enable : autostart.disable)()
    await configManager.setConfig('launchAtLogin', checked)
}

export default function Preferences() {
    const locale = useLocale()
    const T = useTranslation()

    const config = configManager.useConfig()

    return (
        <Container align="stretch" direction="column" gap={8}>
            <Header>{T.THEME()}</Header>
            <NativeSelect data={themes} defaultValue="light" onChange={handleThemeChange} />
            <Header>{T.LANGUAGE()}</Header>
            <NativeSelect data={languages} onChange={handleLocaleChange} value={locale} />
            <Header>{T.GENERAL()}</Header>
            <Checkbox checked={config.launchAtLogin} label={T.START_AT_LOGIN()} onChange={handleStartAtLoginChange} />
        </Container>
    )
}
