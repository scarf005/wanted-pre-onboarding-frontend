import { ChangeEvent, useState } from "react"
import { Result } from "../utils/Result"

type InputEvent = ChangeEvent<HTMLInputElement>

export type ValidationState = Result<null, string>

export type UseInputValidation = {
  state: ValidationState
  validate: (e: InputEvent) => void
}

const defaultValidity = {
  type: "err",
  error: "",
} satisfies ValidationState

export const getValidity = (e: InputEvent): ValidationState =>
  e.target.checkValidity()
    ? { type: "ok", data: null }
    : { type: "err", error: e.target.validationMessage }

/**
 * uses DOM API to validate input and get error message.
 */
export const useInputValidation = (): UseInputValidation => {
  const [val, set] = useState<ValidationState>(defaultValidity)
  const validate = (e: InputEvent) => set(getValidity(e))

  return { state: val, validate }
}
