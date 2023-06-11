export type Result<T, E> =
  | { type: "ok"; data: T }
  | { type: "err"; error: E }
