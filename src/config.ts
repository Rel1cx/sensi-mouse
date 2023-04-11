import { Result } from '@swan-io/boxed'
import { Store } from 'tauri-plugin-store-api'
import { proxy, useSnapshot } from 'valtio'

import { type AnyObject, Config } from '@/types'

const configStore = new Store('.config.dat')

export const defaultConfig = Config.parse({})

export const configProxy = proxy(defaultConfig)

export const setConfig = async <T extends keyof Config>(key: T, value: Config[T]) => {
    await configStore.set(key, value)
    await configStore.save()
}

export const useConfig = () => [useSnapshot(configProxy), setConfig] as const

export const loadConfig: () => Promise<Result<Config, Error>> = async () => {
    const saved = await configStore
        .entries()
        .then(entries => entries.reduce<AnyObject>((acc, [key, value]) => ((acc[key] = value), acc), {}))

    return Result.fromExecution(() => Config.parse(saved))
}

export const resetConfig = async () => {
    await configStore.reset()
    await configStore.save()
}

configStore.onChange((key, value) => {
    Reflect.set(configProxy, key, value)
})
