import { Lazy, Option, Result } from "@swan-io/boxed"
import { invoke as tauriInvoke } from "@tauri-apps/api"
import { type InvokeArgs } from "@tauri-apps/api/tauri"

// eslint-disable-next-line etc/no-misused-generics
export const invoke = <T = void>(cmd: string, payload?: InvokeArgs) => {
    return Result.fromPromise<T, Error>(tauriInvoke<T>(cmd, payload))
}

export const TauriWindowLazy = Lazy(() => import("@tauri-apps/api/window"))

export const getWebviewWindow = async (label: string) => {
    const tauriWindow = await TauriWindowLazy.get()
    const { WebviewWindow } = tauriWindow
    const target = WebviewWindow.getByLabel(label)
    return Option.fromNullable(target)
}
