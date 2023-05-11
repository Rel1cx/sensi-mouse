/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

import { Enum, isKeyOfEnum } from '@/lib/types'

export const Config = z.object({
    accEnabled: z.boolean().default(false).describe('Acceleration enabled'),
    locale: z.string().default('en').describe('Language'),
    sen: z.number().min(0).max(100).default(90).describe('Sensitivity'),
    theme: z
        .union([z.literal('light'), z.literal('dark')])
        .default('light')
        .describe('Theme'),
})

export type Config = z.infer<typeof Config>

export const Theme = Enum('light', 'dark')

export type Theme = Enum<typeof Theme>

export const isTheme = isKeyOfEnum(Theme)
