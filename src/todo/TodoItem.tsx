import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { UpdateTodoProps } from "./TodoList"
import { StyledCheckbox } from "./StyledCheckbox"
import { StyledSpan } from "./StyledSpan"
import { FormEvent, useState } from "react"

type Props =
  & Todo
  & {
    update: ({ todo, isCompleted }: Partial<UpdateTodoProps>) => void
    remove: () => void
  }

export const TodoItemEdit = (
  { todo: initalText, update, close }: Pick<Todo, "todo"> & {
    update: ({ todo }: Pick<UpdateTodoProps, "todo">) => void
    close: () => void
  },
) => {
  const [text, setText] = useState(initalText)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    update({ todo: text })
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
  { todo, isCompleted, update, remove }: Props,
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
        checked={isCompleted}
        onChange={({ currentTarget: { checked } }) =>
          update({ todo, isCompleted: checked })}
      />
      {isModify
        ? (
          <TodoItemEdit
            todo={todo}
            update={update}
            close={() => setModify(false)}
          />
        )
        : (
          <>
            <StyledSpan title={todo}>{todo}</StyledSpan>
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
              onClick={remove}
            >
              삭제
            </button>
          </>
        )}
    </label>
  )
}
