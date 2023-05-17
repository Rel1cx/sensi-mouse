import { Config } from "@/types"

import { type Locales } from "./i18n/i18n-types"
import { ConfigManager } from "./lib/config"

export const defaultConfig: Config & {
    locale: Locales
} = {
    sen: 90,
    accEnabled: false,
    locale: "en",
    theme: "light",
}

export const configManager = ConfigManager.make({ name: ".config.dat", parse: (data) => Config.parse(data) })
