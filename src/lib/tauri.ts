import { Lazy, Option, Result } from '@swan-io/boxed'
import { invoke } from '@tauri-apps/api'

export const TauriWindowLazy = Lazy(() => import('@tauri-apps/api/window'))

export async function getWebviewWindow(label: string) {
    const WebviewWindow = await TauriWindowLazy.get().then(window => window.WebviewWindow)
    const target = WebviewWindow.getByLabel(label)
    return Option.fromNullable(target)
}

export function enableAutoStart() {
    return invoke<void>('plugin:auto_launch|enable')
}

export function disableAutoStart() {
    return invoke<void>('plugin:auto_launch|disable')
}

export function getAutoStart() {
    return invoke<boolean>('plugin:auto_launch|is_enabled').then(enabled => !!enabled)
}
