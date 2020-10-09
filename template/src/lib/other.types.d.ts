/* eslint-disable no-inner-declarations */

declare module 'thunky/promise' {
  export default function <T>(fn: () => Promise<T>): () => Promise<T>;
}
