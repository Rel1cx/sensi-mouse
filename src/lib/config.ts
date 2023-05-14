import { Result } from "@swan-io/boxed"
import { Store } from "tauri-plugin-store-api"

import { type UnknownObject } from "@/lib/types"

export const ConfigManager = <T extends UnknownObject>(name: string, parse: (data: UnknownObject) => T) => {
    const store = new Store(name)

    return {
        loadConfig: async () => {
            const saved = await store.entries().then((entries) => {
                return entries.reduce<UnknownObject>((acc, [key, value]) => {
                    acc[key] = value
                    return acc
                }, {})
            })

            return Result.fromExecution(() => parse(saved))
        },

        resetConfig: async () => {
            await store.reset()
        },

        setConfig: async <K extends Extract<keyof T, string>>(key: K, value: T[K]) => {
            await store.set(key, value)
            await store.save()
        },
    }
}
