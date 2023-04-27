import { Result } from '@swan-io/boxed'
import { Store } from 'tauri-plugin-store-api'
import { proxy, useSnapshot } from 'valtio'

import { type UnknownObject } from '@/lib/types'

export const ConfigManager = <T extends UnknownObject>(
    name: string,
    defaultValue: T,
    parse: (data: UnknownObject) => T
) => {
    const configProxy: T = proxy<T>(defaultValue)
    const configStore = new Store(name)

    return {
        loadConfig: async () => {
            const saved = await configStore.entries().then(entries => {
                return entries.reduce<UnknownObject>((acc, [key, value]) => ((acc[key] = value), acc), {})
            })

            return Result.fromExecution(() => parse(saved)).tapOk(value => Object.assign(configProxy, value))
        },

        resetConfig: async () => {
            await configStore.reset()
        },

        setConfig: async <K extends Extract<keyof T, string>>(key: K, value: T[K]) => {
            configProxy[key] = value
            await configStore.set(key, value)
            await configStore.save()
        },

        useConfig: () => useSnapshot<T>(configProxy),

        beginSyncConfig: async () => {
            return configStore.onChange((key, value) => {
                if (Reflect.get(configProxy, key) === value) {
                    return
                }
                Reflect.set(configProxy, key, value)
            })
        }
    }
}
