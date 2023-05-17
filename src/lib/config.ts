/* eslint-disable promise/prefer-await-to-then */
import { Option, Result } from "@swan-io/boxed"
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
        return Result.fromPromise(this.#store.entries().then(Object.fromEntries).then(this.parse))
    }

    resetConfig() {
        return Result.fromPromise(this.#store.reset())
    }

    setConfig<K extends Extract<keyof T, string>>(key: K, value: T[K]) {
        return Result.fromPromise(this.#store.set(key, value).then(() => this.#store.save()))
    }

    async getConfig<K extends Extract<keyof T, string>>(key: K) {
        return Option.fromNullable(await this.#store.get<T[K]>(key))
    }
}
