import { CSSProperties } from "react"
import { ValidationState } from "../utils/useInputValidation"

const errorStyle: CSSProperties = {
  color: "crimson",
  fontSize: "1rem",
  minHeight: "1rem",
  maxWidth: "22rem",
  margin: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

type Props = { state: ValidationState }
export const ErrorMessage = ({ state }: Props) => {
  const isErr = state.type === "err"
  const message = isErr ? state.error : "(빈 에러 메시지)"
  return (
    <p style={errorStyle}>
      <em title={message} style={{ visibility: isErr ? undefined : "hidden" }}>
        {message}
      </em>
    </p>
  )
}
