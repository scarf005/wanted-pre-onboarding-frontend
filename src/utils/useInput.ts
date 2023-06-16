import { useInputValidation, ValidationState } from "./useInputValidation"
import { UseInputState, useInputState } from "./useInputState"

export type UseValidatedInput = Omit<UseInputState, 'state'> & { state: ValidationState }

/**
 * hook for a label and input pair.
 */
export const useValidatedInput = (init = ""): UseValidatedInput => {
  const input = useInputState(init)
  const { state, validate } = useInputValidation()

  return {
    ...input,
    state,
    onChange: (e) => {
      validate(e)
      input.onChange(e)
    },
  }
}
