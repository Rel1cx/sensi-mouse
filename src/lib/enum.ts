import type { UnionFromTuple } from "./utils"

export const Enum: <T extends string[]>(...args: T) => Readonly<{ [P in UnionFromTuple<T>]: P }> = <T extends string[]>(
    ...args: T
) => {
    type Ret = { [P in UnionFromTuple<typeof args>]: P }
    return Object.freeze(
        args.reduce<Ret>((acc, next) => {
            return {
                ...acc,
                [next]: next,
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        }, Object.create(null)),
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Enum<T extends object> = T[keyof T]

export const isKeyOfEnum = <T extends object>(enumType: T) => {
    return (key: unknown): key is keyof T => {
        return !!Object.values(enumType).includes(key)
    }
}
