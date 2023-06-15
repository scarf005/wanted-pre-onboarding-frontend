import { Todo } from "../../../utils/Todo"
import { StyledCheckbox } from "../../views/StyledCheckbox"

type Props = Pick<Todo, "isCompleted"> & {
  onCheck: (checked: boolean) => Promise<void>
}

export const TodoCheckbox = ({ isCompleted, onCheck }: Props) => (
  <StyledCheckbox
    checked={isCompleted}
    onChange={(e) => onCheck(e.currentTarget.checked)}
  />
)
