import { HTTPError } from "ky"

export type Result<T, E> = { type: "ok"; data: T } | { type: "err"; error: E }

export type AsyncResult<T, E> = Promise<Result<T, E>>

export const fromPromise = <T, E = HTTPError>(
  res: Promise<T>,
): AsyncResult<T, E> =>
  res
    .then((data) => ({ type: "ok", data } as const))
    .catch(async (error) => ({
      type: "err",
      error:
        error instanceof HTTPError
          ? ((await error.response.json()) as E)
          : error,
    }))
