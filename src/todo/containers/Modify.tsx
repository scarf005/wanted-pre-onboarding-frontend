import { ButtonHTMLAttributes, FormEvent, ReactNode } from "react"
import { tid } from "../../utils/ids"
import { Todo } from "../../utils/Todo"
import { type InputState, useInputState } from "../../utils/useInputState"

type Props = {
  init: Todo["todo"]
  onSubmit: ({ todo }: Pick<Todo, "todo">) => Promise<void>
  cancelButton: ReactNode
}

export const Modify = (
  { init, onSubmit, cancelButton }: Props,
) => {
  const input = useInputState(init)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit({ todo: input.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input {...input} />
      <SubmitButton
        disabled={input.unchanged}
        title={input.unchanged ? "변경사항이 없습니다" : ""}
      />
      {cancelButton}
    </form>
  )
}

export const SubmitButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <button type="submit" data-testid={tid.submitButton} {...props}>
    제출
  </button>
)

const Input = ({ value, onChange }: InputState) => (
  <input
    data-testid={tid.modifyInput}
    value={value}
    onChange={onChange}
  />
)
