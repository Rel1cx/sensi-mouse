import { Lazy, Option, Result } from '@swan-io/boxed'
import { invoke as tauriInvoke } from '@tauri-apps/api'
import { type InvokeArgs } from '@tauri-apps/api/tauri'

// eslint-disable-next-line etc/no-misused-generics
export async function invoke<R = void>(cmd: string, payload?: InvokeArgs) {
    return Result.fromPromise<R, Error>(tauriInvoke<R>(cmd, payload))
}

export const TauriWindowLazy = Lazy(() => import('@tauri-apps/api/window'))

export async function getWebviewWindow(label: string) {
    const WebviewWindow = await TauriWindowLazy.get().then(window => window.WebviewWindow)
    const target = WebviewWindow.getByLabel(label)
    return Option.fromNullable(target)
}
