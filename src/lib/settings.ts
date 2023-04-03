import { Store } from 'tauri-plugin-store-api'

import { makeAsyncGetWithDefault } from './tools'

export const settings = new Store('.settings.dat')

export const getSettings = makeAsyncGetWithDefault(settings)
