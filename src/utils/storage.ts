import { useEffect, useState } from "react"
import { localStorageKey } from "./ids"

/** Abstraction of simple one-item storage. */
export type Storage<T = string> = {
  get: () => T | null
  set: (value: T) => void
  remove: () => void
}

export const useStorage = <T, const K extends string = string>(
  storage: Storage,
  key: K,
  fallback: T,
) => {
  const [val, set] = useState<T>(() => {
    const item = storage.get()
    return item ? JSON.parse(item) : fallback
  })
  useEffect(() => storage.set(JSON.stringify(val)), [storage, val, key])

  return [val, set] as const
}

export const storeLocal = (key: string): Storage => ({
  get: () => localStorage.getItem(key),
  set: (value: string) => localStorage.setItem(key, value),
  remove: () => localStorage.removeItem(key),
})

export const jwtStorage = storeLocal(localStorageKey.jwtToken)

export const useJwtStorage = () =>
  useStorage(jwtStorage, localStorageKey.jwtToken, "")
