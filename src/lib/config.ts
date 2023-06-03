import { Option, Task } from "ftld"
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

    loadConfig() {
        return Task.from(() => this.#store.entries())
            .map(Object.fromEntries)
            .map(this.parse)
            .run()
    }

    resetConfig() {
        return Task.from(() => this.#store.reset()).run()
    }

    setConfig<K extends Extract<keyof T, string>>(key: K, value: T[K]) {
        return Task.from(() => this.#store.set(key, value))
            .tap(() => this.#store.save())
            .run()
    }

    async getConfig<K extends Extract<keyof T, string>>(key: K) {
        return Option.from(await this.#store.get<T[K]>(key))
    }
}
