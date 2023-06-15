import { Todo } from "../utils/Todo"
import { CSSProperties, ReactNode } from "react"
import { useBoolean } from "./hooks/useBoolean"
import { TodoItemEdit } from "./TodoItemEdit"
import { UseTodoList } from "./hooks/useTodoList"
import { EditTodoButton } from "./components/EditTodoButton"

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
}

export type Props =
  & {
    todo: Todo
    both: ReactNode
    nonEdit: ReactNode
  }
  & Pick<UseTodoList, "updateTodo">

export const TodoItem = (
  { todo, updateTodo, nonEdit, both }: Props,
) => {
  const { val: isModify, on: setModify, off: unsetModify } = useBoolean(
    false,
  )

  return (
    <label style={labelStyle}>
      {both}
      {isModify
        ? (
          <TodoItemEdit
            todo={todo}
            updateTodo={updateTodo}
            close={unsetModify}
          />
        )
        : (
          <>
            {nonEdit}
            <EditTodoButton onClick={setModify} />
          </>
        )}
    </label>
  )
}
