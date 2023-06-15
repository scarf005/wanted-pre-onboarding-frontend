import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { StyledCheckbox } from "./StyledCheckbox"
import { StyledSpan } from "./StyledSpan"
import { CSSProperties, FormEvent, useState } from "react"
import { UseTodoList } from "./useTodoList"
import { useBoolean } from "./useBoolean"
import { useInputState } from "./useInputState"

type Props =
  & { todo: Todo }
  & Pick<UseTodoList, "removeTodo" | "updateTodo">

export const TodoItemEdit = (
  { todo, updateTodo, close }:
    & { todo: Todo }
    & Pick<UseTodoList, "updateTodo">
    & { close: () => void },
) => {
  const {text, onChange} = useInputState(todo.todo)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateTodo({ ...todo, todo: text })
    close()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid={tid.modifyInput}
        value={text}
        onChange={onChange}
      />
      <button type="submit" data-testid={tid.submitButton}>
        제출
      </button>
      <button
        type="submit"
        data-testid={tid.cancelButton}
        onClick={close}
      >
        취소
      </button>
    </form>
  )
}

const TodoContent = ({ todo }: Todo) => (
  <StyledSpan title={todo}>{todo}</StyledSpan>
)

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
}

export const TodoItem = (
  { todo, updateTodo, removeTodo }: Props,
) => {
  const { val: isModify, toTrue: setModify, toFalse: unsetModify } = useBoolean(
    false,
  )

  return (
    <label style={labelStyle}>
      <StyledCheckbox
        checked={todo.isCompleted}
        onChange={({ currentTarget: { checked } }) => {
          updateTodo({
            ...todo,
            isCompleted: checked,
          })
        }}
      />
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
