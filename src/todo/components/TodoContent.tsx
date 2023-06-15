import { Todo } from "../../utils/Todo"
import { StyledSpan } from "./StyledSpan"

export const TodoContent = ({ todo }: Pick<Todo, "todo">) => (
  <StyledSpan title={todo}>{todo}</StyledSpan>
)
