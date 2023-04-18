import { Config } from '@/types'

import { ConfigManager } from './lib/config'

export const defaultConfig: Readonly<Config> = Config.parse({})

export const configManager = ConfigManager('.config.dat', defaultConfig, data => Config.parse(data))
