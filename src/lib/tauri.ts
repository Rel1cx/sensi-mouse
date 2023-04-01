import { invoke } from '@tauri-apps/api/tauri'

export const openWindowByLabel = async (label: string) => {
    const WebviewWindow = await import('@tauri-apps/api/window').then(window => window.WebviewWindow)
    const target = WebviewWindow.getByLabel(label)
    // eslint-disable-next-line no-restricted-syntax
    await target?.show()
}

export const enableAutoStart = invoke<void>('plugin:auto_launch|enable')

export const disableAutoStart = invoke<void>('plugin:auto_launch|disable')

export const getAutoStart = async () => {
    return (await invoke<boolean>('plugin:auto_launch|is_enabled')) ?? false
}
