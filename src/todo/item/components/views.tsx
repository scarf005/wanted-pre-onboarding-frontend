import { Todo } from "../../../routes/api"
import { CSSProperties } from "react"

const style: CSSProperties = {
  width: "19rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

const completedStyle: CSSProperties = {
  color: "gray",
  fontStyle: "italic",
  textDecoration: "underline",
  textUnderlineOffset: "-40%",
  textDecorationSkipInk: "none",
}

export const Content = ({
  todo,
  isCompleted,
}: Pick<Todo, "todo" | "isCompleted">) => (
  <span
    style={isCompleted ? { ...style, ...completedStyle } : style}
    title={todo}
  >
    {todo}
  </span>
)
