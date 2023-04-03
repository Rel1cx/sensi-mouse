import { type AsyncGetProtocol } from '@/types'

export const makeAsyncGetWithDefault = (self: AsyncGetProtocol) => {
    return async <T>(
        key: string,
        defaultValue: T,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (value: any) => value is T = (value): value is T => true
    ) => {
        const value = await self.get(key)
        if (value !== null && validator(value)) {
            return value
        }
        return defaultValue
    }
}
