import memoize from 'micro-memoize'

import { loadLocale } from './i18n-util.sync'

export const loadLocaleMemed = memoize(loadLocale)
