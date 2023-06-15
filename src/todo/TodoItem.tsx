import { Todo } from "../utils/Todo"
import { CSSProperties, ReactNode } from "react"
import { useBoolean } from "./hooks/useBoolean"
import { TodoItemEdit } from "./TodoItemEdit"
import { UseTodoList } from "./hooks/useTodoList"
import { EditTodoButton } from "./components/EditTodoButton"
import { CancelSubmitButton } from "./components/CancelSubmitButton"

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
}

export type Props =
  & {
    item: Todo
    both: ReactNode
    nonEdit: ReactNode
  }
  & Pick<UseTodoList, "updateTodo">

export const TodoItem = (
  { item, updateTodo, nonEdit, both }: Props,
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
            init={item.todo}
            onCancel={unsetModify}
            onSubmit={async ({ todo }) => {
              await updateTodo({ ...item, todo })
              unsetModify()
            }}
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
