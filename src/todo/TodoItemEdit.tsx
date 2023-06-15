import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { FormEvent } from "react"
import { UseTodoList } from "./useTodoList"
import { useInputState } from "./useInputState"

export const TodoItemEdit = (
  { todo, updateTodo, close }:
    & { todo: Todo }
    & Pick<UseTodoList, "updateTodo">
    & { close: () => void },
) => {
  const { text, onChange } = useInputState(todo.todo)

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
