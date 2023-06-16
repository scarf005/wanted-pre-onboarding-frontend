import { ButtonHTMLAttributes, FormEvent } from "react"
import { tid } from "../../utils/ids"
import { Todo } from "../../utils/Todo"
import { type InputState, useInputState } from "../../utils/useInputState"
import { CancelSubmitButton } from "../item/components/buttons"
import { useSerializedSubmit } from "../../utils/serialized"

type Props = {
  item: Todo
  unsetEdit: () => void
}

export const Modify = (
  { item, unsetEdit }: Props,
) => {
  const submit = useSerializedSubmit()
  const input = useInputState(item.todo)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit({ ...item, todo: input.value }, { method: "PUT" })
    unsetEdit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input {...input} />
      <SubmitButton
        disabled={input.unchanged}
        title={input.unchanged ? "변경사항이 없습니다" : ""}
      />
      <CancelSubmitButton onClick={unsetEdit} />
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
