import { Todo } from "../utils/Todo"
import { StyledSpan } from "./StyledSpan"

export const TodoContent = ({ todo }: Todo) => (
  <StyledSpan title={todo}>{todo}</StyledSpan>
)
