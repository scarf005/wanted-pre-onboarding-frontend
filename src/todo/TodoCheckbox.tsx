import { Todo } from "../utils/Todo"
import { UseTodoList } from "./useTodoList"
import { StyledCheckbox } from "./StyledCheckbox"

type Props = Todo & Pick<UseTodoList, "updateTodo">

export const TodoCheckbox = (
  { updateTodo, ...todo }: Props,
) => (
  <StyledCheckbox
    checked={todo.isCompleted}
    onChange={({ currentTarget: { checked } }) =>
      updateTodo({ ...todo, isCompleted: checked })}
  />
)
