import { useEffect, useState } from "react"
import { localStorageKey } from "./ids"

export const useLocalJwtStorage = () => {
  const [val, set] = useState<string | null>(
    () => localStorage.getItem(localStorageKey.jwtToken),
  )
  useEffect(() => {
    if (val) {
      console.log(`setting jwt token to localStorage`)
      localStorage.setItem(localStorageKey.jwtToken, val)
    } else {
      console.log("removing jwt token as it is null")
      localStorage.removeItem(localStorageKey.jwtToken)
    }
  }, [val])

  return [val, set] as const
}
