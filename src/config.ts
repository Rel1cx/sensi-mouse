import { Result } from '@swan-io/boxed'
import { type UnlistenFn } from '@tauri-apps/api/event'
import { Store } from 'tauri-plugin-store-api'
import { proxy, useSnapshot } from 'valtio'

import { Config } from '@/types'
import { type AnyObject } from '@/types'

const STORE_KEY = Symbol('CONFIG_STORE')
const PROXY_KEY = Symbol('CONFIG_PROXY')

export type ConfigManager = Readonly<{
    [STORE_KEY]: Store,
    [PROXY_KEY]: Config,

    parse: (config: AnyObject) => Result<Config, Error>,
    setConfig: <T extends keyof Config>(key: T, value: Config[T]) => Promise<void>,
    useConfig: () => [Config, ConfigManager['setConfig']]
    loadConfig: () => Promise<Result<Config, Error>>,
    resetConfig: () => Promise<void>,
    beginSyncConfig: () => Promise<UnlistenFn>
}>

export const defaultConfig: Readonly<Config> = Config.parse({})

export const configManager: ConfigManager = {
    [STORE_KEY]: new Store('.config.dat'),
    [PROXY_KEY]: proxy(defaultConfig),

    parse: config => Result.fromExecution(() => Config.parse(config)),

    useConfig: () => [useSnapshot(configManager[PROXY_KEY]), configManager.setConfig],

    setConfig: async (key, value) => {
        configManager[PROXY_KEY][key] = value
        await configManager[STORE_KEY].set(key, value)
        await configManager[STORE_KEY].save()
    },

    loadConfig: async () => {
        const saved = await configManager[STORE_KEY].entries().then(entries =>
            entries.reduce<AnyObject>((acc, [key, value]) => ((acc[key] = value), acc), {})
        )

        return configManager.parse(saved).tapOk(config => Object.assign(configManager[PROXY_KEY], config))
    },

    resetConfig: async () => {
        await configManager[STORE_KEY].reset()
    },

    beginSyncConfig: async () => {
        return configManager[STORE_KEY].onChange((key, value) => {
            if (Reflect.get(configManager[PROXY_KEY], key) === value) {
                return
            }
            Reflect.set(configManager[PROXY_KEY], key, value)
        })
    }
}
