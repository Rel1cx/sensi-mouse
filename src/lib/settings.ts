import { Store } from 'tauri-plugin-store-api'

import { makeAsyncGetWithDefault } from './helper'

export const settings = new Store('.settings.dat')

export const getSettings = makeAsyncGetWithDefault(settings)

settings.onKeyChange('locale', () => {
    // TODO: sync locale cross all windows without reloading the page
    window.location.reload()
})
