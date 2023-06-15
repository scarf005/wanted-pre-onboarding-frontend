import { useState } from "react"

export const useBoolean = (initial: boolean) => {
  const [val, set] = useState(initial)
  return {
    val,
    set,
    toTrue: () => set(true),
    toFalse: () => set(false),
    toggle: () => set((prev) => !prev),
  }
}
