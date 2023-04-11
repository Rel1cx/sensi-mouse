import { setConfig } from './config'
import { DEFAULT_ACC_ENABLED, DEFAULT_SEN } from './constants'
import { getMouseCfg } from './lib/cmd'

export const syncAppStateWithSystem = async () => {
    const ret = await getMouseCfg()
    const [sen, accEnabled] = ret.getWithDefault([DEFAULT_SEN, DEFAULT_ACC_ENABLED])

    setConfig('sen', sen)
    setConfig('accEnabled', accEnabled)
}
