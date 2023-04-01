import { Lazy, Option, Result } from '@swan-io/boxed'
import { invoke } from '@tauri-apps/api'

export const TauriWindowLazy = Lazy(() => import('@tauri-apps/api/window'))

export async function getWebviewWindow(label: string) {
    const WebviewWindow = await TauriWindowLazy.get().then(window => window.WebviewWindow)
    const target = WebviewWindow.getByLabel(label)
    return Option.fromNullable(target)
}

export function enableAutoStart() {
    return Result.fromPromise<void, Error>(invoke('plugin:auto_launch|enable'))
}

export function disableAutoStart() {
    return Result.fromPromise<void, Error>(invoke('plugin:auto_launch|disable'))
}

export function getAutoStart() {
    return Result.fromPromise<boolean, Error>(
        invoke<boolean>('plugin:auto_launch|is_enabled').then(enabled => !!enabled)
    )
}

export function getMouseCfg() {
    return Result.fromPromise<[number, boolean], Error>(invoke<[number, boolean]>('get_mouse_cfg'))
}

export function setMouseCfg(sen: number, accEnabled: boolean) {
    return Result.fromPromise<void, Error>(invoke('set_mouse_cfg', { sen, accEnabled }))
}
