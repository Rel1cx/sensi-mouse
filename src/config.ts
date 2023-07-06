import { Config } from "@/types"

import { DEFAULT_ACC_ENABLED, DEFAULT_LOCALE, DEFAULT_SEN } from "./constants"
import { type Locales } from "./i18n/i18n-types"
import { ConfigManager } from "./lib/config"

export const defaultConfig: Config & {
    locale: Locales
} = {
    sen: DEFAULT_SEN,
    accEnabled: DEFAULT_ACC_ENABLED,
    locale: DEFAULT_LOCALE,
    theme: "light",
}

export const configManager = ConfigManager.make({ name: ".config.dat", parse: (data) => Config.parse(data) })
