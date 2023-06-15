import { tid } from "../../utils/ids"
import type { UseTodoList } from "../hooks/useTodoList"
import {
  InputState,
  UseInputState,
  useInputState,
} from "../../utils/useInputState"
import { FormEvent } from "react"

export const CreateItem = ({ addTodo }: Pick<UseTodoList, "addTodo">) => {
  const input = useInputState()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTodo({ todo: input.value })
    input.clear()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input {...input} />
      <Submit empty={input.empty} />
    </form>
  )
}

const Submit = ({ empty }: Pick<UseInputState, "empty">) => (
  <button type="submit" data-testid={tid.newTodoAddButton} disabled={empty}>
    추가
  </button>
)

const Input = ({ value, onChange }: InputState) => (
  <input
    data-testid={tid.newTodoInput}
    value={value}
    onChange={onChange}
  />
)
