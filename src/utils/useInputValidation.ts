import { ChangeEvent, useState } from "react"

type InputEvent = ChangeEvent<HTMLInputElement>

export type ValidationState =
  | { type: "pre" }
  | { type: "ok" }
  | { type: "err"; error: string }

export type UseInputValidation = {
  state: ValidationState
  validate: (e: InputEvent) => void
}

const defaultValidity = { type: "pre" } satisfies ValidationState

export const getValidity = (e: InputEvent): ValidationState =>
  e.target.checkValidity()
    ? { type: "ok" }
    : { type: "err", error: e.target.validationMessage }

/**
 * uses DOM API to validate input and get error message.
 */
export const useInputValidation = (): UseInputValidation => {
  const [val, set] = useState<ValidationState>(defaultValidity)
  const validate = (e: InputEvent) => set(getValidity(e))

  return { state: val, validate }
}
