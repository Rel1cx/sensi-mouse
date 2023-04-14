import { z } from 'zod'

export type AnyObject = {
    [key: string]: unknown
}

export type Theme = 'dark' | 'light'

export const Config = z.object({
    locale: z
        .string()
        .default('en')
        .describe('Language'),
    theme: z
        .union([z.literal('light'), z.literal('dark')])
        .default('light')
        .describe('Theme'),
    sen: z.number().min(0).max(100).default(90).describe('Sensitivity'),
    accEnabled: z.boolean().default(false).describe('Acceleration enabled'),
    launchAtLogin: z.boolean().default(false).describe('Launch at login')
})

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Config = z.infer<typeof Config>
