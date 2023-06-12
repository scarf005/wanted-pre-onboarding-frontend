import { useEffect } from "react"

export const useTimeout = (fn: () => void, ms: number) => {
  useEffect(() => {
    const id = setTimeout(fn, ms)
    return () => clearTimeout(id)
  }, [fn, ms])
}
