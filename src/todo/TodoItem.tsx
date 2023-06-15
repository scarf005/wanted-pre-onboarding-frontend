import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { StyledSpan } from "./StyledSpan"
import { CSSProperties } from "react"
import { useBoolean } from "./useBoolean"
import { Props, TodoItemEdit } from "./TodoItemEdit"

const TodoContent = ({ todo }: Todo) => (
  <StyledSpan title={todo}>{todo}</StyledSpan>
)

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
}

export const TodoItem = (
  { todo, updateTodo, removeTodo, children }: Props,
) => {
  const { val: isModify, toTrue: setModify, toFalse: unsetModify } = useBoolean(
    false,
  )

  return (
    <label style={labelStyle}>
      {children}
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
            <TodoContent {...todo} />
            <button
              type="button"
              data-testid={tid.modifyButton}
              onClick={setModify}
            >
              수정
            </button>
            <button
              type="button"
              data-testid={tid.deleteButton}
              onClick={() => removeTodo(todo)}
            >
              삭제
            </button>
          </>
        )}
    </label>
  )
}
