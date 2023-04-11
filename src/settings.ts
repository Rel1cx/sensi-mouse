import { Result } from '@swan-io/boxed'
import { Store } from 'tauri-plugin-store-api'
import { z } from 'zod'

import { type AnyObject } from '@/types'

export const settings = new Store('.settings.dat')

export const settingsSchema = z.object({
    locale: z
        .union([z.literal('en'), z.literal('zh')])
        .default('en')
        .describe('Language'),
    theme: z
        .union([z.literal('light'), z.literal('dark')])
        .default('light')
        .describe('Theme'),
    sen: z.number().min(0).max(100).default(90).describe('Sensitivity'),
    accEnabled: z.boolean().default(false).describe('Acceleration enabled')
})

export type Settings = z.infer<typeof settingsSchema>

export const defaultSettings = settingsSchema.parse({})

export const setSettingsByKey = async (key: keyof Settings, value: Settings[keyof Settings]) => {
    await settings.set(key, value)
}

export const loadSettings = async () => {
    const entries = await settings.entries()
    const savedSettings = entries.reduce<AnyObject>((acc, [key, value]) => ((acc[key] = value), acc), {})
    return Result.fromPromise<Settings, Error>(settingsSchema.parseAsync(savedSettings))
}

export const resetSettings = async () => {
    await settings.clear()
}
