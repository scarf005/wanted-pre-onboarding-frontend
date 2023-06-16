import { Todo } from "../../../routes/api"
import { CSSProperties } from "react"

const style: CSSProperties = {
  width: "10em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

export const Content = ({ todo }: Pick<Todo, "todo">) => (
  <span style={style} title={todo}>{todo}</span>
)
