import { Result } from "@swan-io/boxed";
import { invoke as tauriInvoke } from "@tauri-apps/api";
import { type InvokeArgs } from "@tauri-apps/api/tauri";

export const invoke = <T = void>(cmd: string, payload?: InvokeArgs) => {
  return Result.fromPromise<T, Error>(tauriInvoke<T>(cmd, payload));
};
