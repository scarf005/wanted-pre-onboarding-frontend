import { ChangeEvent, useState } from "react"
import { useInputValidation, ValidationState } from "./useInputValidation"

export type UseInput = {
  value: string
  handle: (e: ChangeEvent<HTMLInputElement>) => void
  state: ValidationState
}

/**
 * hook for a label and input pair.
 */
export const useInput = (): UseInput => {
  const [value, set] = useState("")
  const { state, validate } = useInputValidation()

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    validate(e)
    set(value)
  }
  return { value, handle, state }
}
