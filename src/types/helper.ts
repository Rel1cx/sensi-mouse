export function passThrough<T>(val: T): T {
    return val
}

export type UnionToTuple<Union> = Union extends infer A | infer B ? [A, B] : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T
