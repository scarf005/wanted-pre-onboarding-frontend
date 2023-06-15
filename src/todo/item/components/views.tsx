import { Todo } from "../../../api"
import { StyledSpan } from "../../views"

export const Content = ({ todo }: Pick<Todo, "todo">) => (
  <StyledSpan title={todo}>{todo}</StyledSpan>
)
