import type { UnionFromTuple } from "./types"

export const Enum: <T extends string[]>(...args: T) => Readonly<{ [P in UnionFromTuple<T>]: P }> = <T extends string[]>(
    ...args: T
) => {
    type Ret = { [P in UnionFromTuple<typeof args>]: P }
    return Object.freeze(
        args.reduce((acc, next) => {
            return {
                ...acc,
                [next]: next,
            } as Ret
        }, Object.create(null)) as Ret,
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Enum<T extends object> = T[keyof T]

export const isKeyOfEnum = <T extends object>(enumType: T) => {
    return (key: unknown): key is keyof T => {
        return !!Object.values(enumType).includes(key)
    }
}
