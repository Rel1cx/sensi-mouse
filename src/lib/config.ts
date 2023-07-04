import { Option as O, Result as R } from "@swan-io/boxed"
import { Store } from "tauri-plugin-store-api"

export type ConfigManagerProps<T> = {
    name: string
    parse: (data: unknown) => T
}

export class ConfigManager<T> {
    parse: (data: unknown) => T

    #store: Store

    private constructor({ name, parse }: ConfigManagerProps<T>) {
        this.#store = new Store(name)
        this.parse = parse
    }

    static make<T>(props: ConfigManagerProps<T>) {
        return new ConfigManager<T>(props)
    }

    async loadConfig() {
        const result = await R.fromPromise(this.#store.entries())
        return result.map(Object.fromEntries).map(this.parse)
    }

    resetConfig() {
        return R.fromPromise(this.#store.reset())
    }

    async setConfig<K extends Extract<keyof T, string>>(key: K, value: T[K]) {
        const result = await R.fromPromise(this.#store.set(key, value))
        result.tap(() => this.#store.save())
        return result
    }

    async getConfig<K extends Extract<keyof T, string>>(key: K) {
        return O.fromNullable(await this.#store.get<T[K]>(key))
    }
}
