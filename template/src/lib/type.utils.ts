/**
 * Custom TypeScript utilities
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

// Make all optional preperties required, but allow undefined
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

// All properties absolutely required, no undefined allowed
export type CompleteNonNullable<T> = {
  [K in keyof Complete<T>]: NonNullable<T[K]>;
};

// No additional properties allowed
type Impossible<K extends keyof any> = {
  [P in K]: never;
};
export type Exact<T, U extends T> = U & Impossible<Exclude<keyof U, keyof T>>;

// All optional properties are required and no additional allowed
export type RequiredExact<T, U extends Required<T>> = Exact<T, U>;
