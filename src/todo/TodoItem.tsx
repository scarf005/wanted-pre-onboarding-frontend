import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { CSSProperties, ReactNode } from "react"
import { useBoolean } from "./hooks/useBoolean"
import { TodoItemEdit } from "./TodoItemEdit"
import { UseTodoList } from "./hooks/useTodoList"

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
}

export const EditTodoButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    data-testid={tid.modifyButton}
    onClick={onClick}
  >
    수정
  </button>
)

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
