import { TodoCreateRequest } from "../../api"
import { tid } from "../../utils/ids"
import {
  InputState,
  UseInputState,
  useInputState,
} from "../../utils/useInputState"
import { Form } from "react-router-dom"

export const CreateItem = () => {
  const input = useInputState()

  return (
    <Form method="post" onSubmit={() => input.clear()}>
      <Input {...input} />
      <Submit empty={input.empty} />
    </Form>
  )
}

const Submit = ({ empty }: Pick<UseInputState, "empty">) => (
  <button
    type="submit"
    data-testid={tid.newTodoAddButton}
    disabled={empty}
    title={empty ? "할 일을 입력해주세요" : undefined}
  >
    추가
  </button>
)

const Input = ({ value, onChange }: InputState) => (
  <input
    name={"todo" satisfies keyof TodoCreateRequest}
    data-testid={tid.newTodoInput}
    value={value}
    onChange={onChange}
    minLength={1}
  />
)
