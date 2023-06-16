import { useState } from "react"

export const useBoolean = (initial: boolean) => {
  const [val, set] = useState(initial)
  return {
    val,
    set,
    on: () => set(true),
    off: () => set(false),
    toggle: () => set((prev) => !prev),
  }
}
