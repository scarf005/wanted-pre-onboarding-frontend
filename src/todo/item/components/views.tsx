import { CSSProperties, ReactNode } from "react"
import { Todo } from "../../../api"
import { StyledSpan } from "../../views"

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
}

export const Label = ({ children }: { children: ReactNode }) => (
  <label style={labelStyle}>{children}</label>
)

export const Content = ({ todo }: Pick<Todo, "todo">) => (
  <StyledSpan title={todo}>{todo}</StyledSpan>
)
