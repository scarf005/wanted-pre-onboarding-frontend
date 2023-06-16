import { Todo } from "../../../utils/Todo"
import { StyledCheckbox } from "../../views/StyledCheckbox"
import { useSerializedSubmit } from "../../../utils/serialized"
import { ChangeEvent } from "react"

export const TodoCheckbox = (item: Todo) => {
  const submit = useSerializedSubmit()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    submit(
      { ...item, isCompleted: e.target.checked },
      { method: "PUT" },
    )

  return (
    <StyledCheckbox
      checked={item.isCompleted}
      onChange={handleChange}
    />
  )
}
