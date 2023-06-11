import { ReactNode } from "react"
import { ValidationState } from "./useInputValidation"

const Error = ({ children }: { children: ReactNode }) => (
  <span
    style={{ color: "crimson", fontSize: "smaller", paddingLeft: "1em" }}
  >
    {children}
  </span>
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
