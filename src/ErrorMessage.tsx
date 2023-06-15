import { CSSProperties, ReactNode } from "react"
import { ValidationState } from "./utils/useInputValidation"

const errorStyle: CSSProperties = {
  color: "crimson",
  fontSize: "smaller",
  paddingLeft: "1em",
}

const Error = ({ children }: { children: ReactNode }) => (
  <span style={errorStyle}>{children}</span>
)

type Props = { state: ValidationState }
export const ErrorMessage = ({ state }: Props) => {
  switch (state.type) {
    case "ok":
      return null
    case "err":
      return <Error>{state.error}</Error>
  }
}
