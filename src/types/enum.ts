export type UnionFromTuple<T> = T extends (infer U)[] ? U : never

export const Enum: <T extends string[]>(...args: T) => Readonly<{ [P in UnionFromTuple<T>]: P }> = <T extends string[]>(
    ...args: T
) => {
    return Object.freeze(
        args.reduce((acc, next) => {
            return {
                ...acc,
                [next]: next
            }
        }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P }
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Enum<T extends object> = T[keyof T]

export const isKeyOfEnum: <T extends object>(key: unknown, enumType: T) => key is keyof T = <T extends object>(
    key: unknown,
    enumType: T
): key is keyof T => {
    return !!Object.values(enumType).includes(key)
}
