import { InputHTMLAttributes } from "react"
import { tid } from "../utils/ids"
import { UseValidatedInput } from "../utils/useInput"
import { ErrorMessage } from "./ErrorMessage"

type Props = UseValidatedInput &
  Partial<{
    labelProps: InputHTMLAttributes<HTMLLabelElement>
    inputProps: InputHTMLAttributes<HTMLInputElement>
  }>

export const EmailInput = ({
  state,
  value,
  onChange,
  labelProps,
  inputProps,
}: Props) => (
  <>
    <label htmlFor={tid.emailInput} {...labelProps}>
      이메일
    </label>
    <input
      required
      name="email"
      type="text"
      autoComplete="email"
      title="이메일은 @를 포함해야 합니다."
      pattern=".*@.*"
      id={tid.emailInput}
      data-testid={tid.emailInput}
      value={value}
      onChange={onChange}
      {...inputProps}
    />
    <ErrorMessage state={state} />
  </>
)

const minPasswordLength = 8

export const PasswordInput = ({
  state,
  value,
  onChange,
  labelProps,
  inputProps,
}: Props) => (
  <>
    <label htmlFor={tid.passwordInput} {...labelProps}>
      비밀번호
    </label>
    <input
      required
      name="password"
      type="password"
      title={`비밀번호는 ${minPasswordLength}자 이상이어야 합니다.`}
      minLength={minPasswordLength}
      id={tid.passwordInput}
      data-testid={tid.passwordInput}
      value={value}
      onChange={onChange}
      {...inputProps}
    />
    <ErrorMessage state={state} />
  </>
)
