import { InputHTMLAttributes } from "react"
import { tid } from "../utils/ids"
import { UseValidatedInput } from "../utils/useInput"
import { ErrorMessage } from "./ErrorMessage"

type Props =
  & UseValidatedInput
  & Partial<{
    labelProps: InputHTMLAttributes<HTMLLabelElement>
    inputProps: InputHTMLAttributes<HTMLInputElement>
  }>

export const EmailInput = (
  { state, value, onChange, labelProps, inputProps }: Props,
) => (
  <>
    <label htmlFor={tid.emailInput} {...labelProps}>
      이메일
      <ErrorMessage state={state} />
    </label>
    <input
      required
      name="email"
      type="email"
      autoComplete="email"
      pattern="^.*@.*$"
      id={tid.emailInput}
      data-testid={tid.emailInput}
      value={value}
      onChange={onChange}
      {...inputProps}
    />
  </>
)

export const PasswordInput = (
  { state, value, onChange, labelProps, inputProps }: Props,
) => (
  <>
    <label htmlFor={tid.passwordInput} {...labelProps}>
      비밀번호
      <ErrorMessage state={state} />
    </label>
    <input
      required
      name="password"
      type="password"
      minLength={8}
      id={tid.passwordInput}
      data-testid={tid.passwordInput}
      value={value}
      onChange={onChange}
      {...inputProps}
    />
  </>
)
