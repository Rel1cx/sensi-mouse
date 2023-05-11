import { Result } from '@swan-io/boxed'
import { Store } from 'tauri-plugin-store-api'

import { type UnknownObject } from '@/lib/types'

export const ConfigManager = <T extends UnknownObject>(name: string, parse: (data: UnknownObject) => T) => {
    const configStore = new Store(name)

    return {
        loadConfig: async () => {
            const saved = await configStore.entries().then(entries => {
                return entries.reduce<UnknownObject>((acc, [key, value]) => ((acc[key] = value), acc), {})
            })

            return Result.fromExecution(() => parse(saved))
        },

        resetConfig: async () => {
            await configStore.reset()
        },

        setConfig: async <K extends Extract<keyof T, string>>(key: K, value: T[K]) => {
            await configStore.set(key, value)
            await configStore.save()
        },
    }
}
