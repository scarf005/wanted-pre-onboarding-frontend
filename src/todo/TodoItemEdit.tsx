import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { FormEvent } from "react"
import { useInputState } from "./hooks/useInputState"
import { CancelSubmitButton } from "./components/CancelSubmitButton"

type Props = {
  init: Todo["todo"]
  onSubmit: ({ todo }: Pick<Todo, "todo">) => Promise<void>
  onCancel: () => void
}

export const TodoItemEdit = (
  { init, onSubmit, onCancel }: Props,
) => {
  const { text, onChange } = useInputState(init)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit({ todo: text })
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
      <CancelSubmitButton onClick={onCancel} />
    </form>
  )
}
