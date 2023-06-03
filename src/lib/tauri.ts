import { invoke as tauriInvoke } from "@tauri-apps/api"
import { type InvokeArgs } from "@tauri-apps/api/tauri"
import { Task } from "ftld"

// eslint-disable-next-line etc/no-misused-generics
export const invoke = <T = void>(cmd: string, payload?: InvokeArgs) => {
    return Task.from<T, Error>(() => tauriInvoke<T>(cmd, payload)).run()
}
