export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type TypeOrTransformer<T> = ((type: T) => T) | T
