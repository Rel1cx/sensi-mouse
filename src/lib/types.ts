export type UnknownObject = {
    [key: string]: unknown
}

export type UnionFromTuple<T> = T extends (infer U)[] ? U : never
