import { useEffect, useState } from "react"
import { Jsonifiable } from "type-fest"
import { useTimeout } from "./useTimeout"
import { otherwise, switchType } from "./utils/switchTag"

export type CacheOption = {
  staleTime: number
  cacheTime: number
}

export type QueryResult<T, E> =
  | { type: "pending" }
  | { type: "ok"; value: T; lastUpdated: number }
  | { type: "stale"; value: T; lastUpdated: number }
  | { type: "err"; error: E }

type Stale<T, E> = Extract<QueryResult<T, E>, { type: "ok" | "stale" }>

type QueryKey = readonly Jsonifiable[]

type QueryOption<T, Key extends QueryKey = []> = {
  queryFn: () => Promise<T>
  queryKey: Key
} & Partial<CacheOption>

export const isStale =
  (staleTime: number) => <T, E>(val: QueryResult<T, E>): val is Stale<T, E> => {
    switch (val.type) {
      case "pending":
      case "err":
        return false
      case "ok":
      case "stale":
        return Date.now() - val.lastUpdated > staleTime
    }
  }

export const useQuery = <
  T,
  E = Error,
  const Args extends QueryKey = [],
>({
  queryFn,
  queryKey,
  cacheTime = 1000 * 5,
}: QueryOption<T, Args>) => {
  const hash = JSON.stringify(queryKey)
  const [val, set] = useState<QueryResult<T, E>>({ type: "pending" })

  useTimeout(() => set({ type: "pending" }), cacheTime)
  useEffect(() => {
    switch (val.type) {
      case "ok":
        break
      default:
        queryFn()
          .then((value) => set({ type: "ok", value, lastUpdated: Date.now() }))
          .catch((error) => set({ type: "err", error }))
    }

  }, [queryFn, hash, cacheTime, val])

  return val
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const req = async () => {
  console.log("async function is called")
  await delay(500)
  return Promise.resolve("data")
}

export const Foo = () => {
  const val = useQuery({
    queryFn: req,
    queryKey: [1],
  })

  switch (val.type) {
    case "pending":
      return <div>Loading...</div>
    case "err":
      return <div>{val.error.message}</div>
    case "ok":
    case "stale": {
      const t = (Date.now() - val.lastUpdated) / 1000
      return <div>{val.type}: {val.value} ({t}s)</div>
    }
  }
}
