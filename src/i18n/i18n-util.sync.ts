// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters.js'
import type { Locales, Translations } from './i18n-types.js'
import { loadedFormatters, loadedLocales, locales } from './i18n-util.js'

import en from './en/index.js'
import zh from './zh/index.js'

const localeTranslations = {
    en,
    zh
}

export const loadLocale = (locale: Locales): void => {
    if (loadedLocales[locale]) return

    loadedLocales[locale] = localeTranslations[locale] as unknown as Translations
    loadFormatters(locale)
}

export const loadAllLocales = (): void => locales.forEach(loadLocale)

export const loadFormatters = (locale: Locales): void => void (loadedFormatters[locale] = initFormatters(locale))