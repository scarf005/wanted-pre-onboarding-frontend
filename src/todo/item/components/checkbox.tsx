import { useSubmit } from "react-router-dom"
import { Todo } from "../../../utils/Todo"
import { StyledCheckbox } from "../../views/StyledCheckbox"
import { serialized } from "../../../utils/serialized"

export const TodoCheckbox = (item: Todo) => {
  const submit = useSubmit()

  return (
    <StyledCheckbox
      checked={item.isCompleted}
      onChange={(e) =>
        submit(
          serialized({ ...item, isCompleted: e.target.checked }),
          { method: "PUT" },
        )}
    />
  )
}
