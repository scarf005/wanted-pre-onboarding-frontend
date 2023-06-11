import { useEffect, useState } from "react"

export const useLocalStorage = <const K extends string, T>(
  key: K,
  fallback: T,
) => {
  const item = localStorage.getItem(key)
  const [val, set] = useState<T>(item ? JSON.parse(item) : fallback)
  useEffect(() => localStorage.setItem(key, JSON.stringify(val)), [val, key])

  return [val, set] as const
}
