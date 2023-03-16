import 'ress/ress.css'
import './theme/global.scss'
import './theme/overrides.scss'
import '@total-typescript/ts-reset'

import { enableAllPlugins, setAutoFreeze, setUseProxies } from 'immer'

import { renderApp } from './root'

enableAllPlugins()
setUseProxies(true)
setAutoFreeze(true)

renderApp()
