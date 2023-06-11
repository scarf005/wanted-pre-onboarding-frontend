import { InputHTMLAttributes } from "react"
import { tid } from "../utils/testid"
import { ErrorMessage } from "./ErrorMessage"
import { UseInput } from "./useInput"

type Props =
  & UseInput
  & Partial<{
    labelProps: InputHTMLAttributes<HTMLLabelElement>
    inputProps: InputHTMLAttributes<HTMLInputElement>
  }>

export const EmailInput = (
  { state, value, handle, labelProps, inputProps }: Props,
) => (
  <>
    <label htmlFor={tid.emailInput} {...labelProps}>
      이메일
      <ErrorMessage state={state} />
    </label>
    <input
      required
      type="email"
      autoComplete="email"
      pattern="^.*@.*$"
      id={tid.emailInput}
      data-testid={tid.emailInput}
      value={value}
      onChange={handle}
      {...inputProps}
    />
  </>
)

export const PasswordInput = (
  { state, value, handle, labelProps, inputProps }: Props,
) => (
  <>
    <label htmlFor={tid.passwordInput} {...labelProps}>
      비밀번호
      <ErrorMessage state={state} />
    </label>
    <input
      required
      type="password"
      minLength={8}
      id={tid.passwordInput}
      data-testid={tid.passwordInput}
      value={value}
      onChange={handle}
      {...inputProps}
    />
  </>
)
