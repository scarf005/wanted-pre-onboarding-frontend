import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { StyledCheckbox } from "./StyledCheckbox"
import { StyledSpan } from "./StyledSpan"
import { FormEvent, useState } from "react"
import { UseTodoList } from "./useTodoList"

type Props =
  & { todo: Todo }
  & Pick<UseTodoList, "removeTodo" | "updateTodo">

export const TodoItemEdit = (
  { todo, updateTodo, close }:
    & { todo: Todo }
    & Pick<UseTodoList, "updateTodo">
    & { close: () => void },
) => {
  const [text, setText] = useState(todo.todo)

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
        onChange={({ currentTarget: { value } }) => setText(value)}
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

export const TodoItem = (
  { todo, updateTodo, removeTodo }: Props,
) => {
  const [isModify, setModify] = useState(false)

  return (
    <label
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <StyledCheckbox
        checked={todo.isCompleted}
        onChange={async ({ currentTarget: { checked } }) =>
          updateTodo({ ...todo, isCompleted: checked })}
      />
      {isModify
        ? (
          <TodoItemEdit
            todo={todo}
            updateTodo={updateTodo}
            close={() => setModify(false)}
          />
        )
        : (
          <>
            <StyledSpan title={todo.todo}>{todo.todo}</StyledSpan>
            <button
              type="button"
              data-testid={tid.modifyButton}
              onClick={() => setModify(true)}
            >
              수정
            </button>
            <button
              type="button"
              data-testid={tid.deleteButton}
              onClick={async () => {
                await removeTodo(todo)
              }}
            >
              삭제
            </button>
          </>
        )}
    </label>
  )
}
