import { Option } from '@swan-io/boxed'
import { Store } from 'tauri-plugin-store-api'

export const settings = new Store('.settings.dat')

// eslint-disable-next-line etc/no-misused-generics
export const getSettings = async <T>(key: string) => Option.fromNullable(await settings.get<T>(key))
