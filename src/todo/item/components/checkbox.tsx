import { Todo } from "../../../utils/Todo"
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
    <input
      type="checkbox"
      checked={item.isCompleted}
      onChange={handleChange}
      style={{ marginRight: "0.5em" }}
    />
  )
}
