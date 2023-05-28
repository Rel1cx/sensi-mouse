import { Checkbox, NativeSelect } from "@mantine/core"
import { useAtom, useSetAtom } from "jotai"

import { launchAtLoginAtom, localeAtom } from "@/atoms"
import { Title } from "@/components/Title/Title"
import { useTranslation } from "@/hooks/useTranslation"
import { type Locales } from "@/i18n/i18n-types"
import { isLocale } from "@/i18n/i18n-util"
import { Theme } from "@/types"

import * as css from "./styles.css"

const themes: { label: string; value: Theme }[] = [
    { label: "Light", value: Theme.light },
    { label: "Dark", value: Theme.dark },
]

const languages: { label: string; value: Locales }[] = [
    { label: "Deutsch", value: "de" },
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
    { label: "Français", value: "fr" },
    { label: "Italiano", value: "it" },
    { label: "日本語", value: "ja" },
    { label: "한국어", value: "ko" },
    { label: "Português", value: "pt" },
    { label: "Русский", value: "ru" },
    { label: "Türkçe", value: "tr" },
    { label: "简体中文", value: "zh-CN" },
    { label: "繁體中文", value: "zh-TW" },
]

const Preferences = () => {
    const T = useTranslation()

    const [locale, setLocale] = useAtom(localeAtom)

    const [launchAtLogin] = useAtom(launchAtLoginAtom)
    const setLaunchAtLogin = useSetAtom(launchAtLoginAtom)

    return (
        <main className={css.container}>
            <Title>{T.THEME()}</Title>
            <NativeSelect data={themes} defaultValue="light" />
            <Title>{T.LANGUAGE()}</Title>
            <NativeSelect
                data={languages}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const { value } = event.target
                    if (!value || !isLocale(value)) {
                        return
                    }
                    setLocale(value)
                }}
                value={locale}
            />
            <Title>{T.GENERAL()}</Title>
            <Checkbox
                checked={launchAtLogin}
                label={T.START_AT_LOGIN()}
                onChange={(e) => {
                    setLaunchAtLogin(e.target.checked)
                }}
            />
        </main>
    )
}

export default Preferences
