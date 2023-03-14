import 'ress/ress.css'
import './polyfill'

import { enableAllPlugins, setAutoFreeze, setUseProxies } from 'immer'

import { renderApp } from './root'

enableAllPlugins()
setUseProxies(true)
setAutoFreeze(true)

renderApp()
