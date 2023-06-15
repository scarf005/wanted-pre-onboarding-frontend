import { Todo } from "../../utils/Todo"
import { StyledCheckbox } from "./StyledCheckbox"

type Props = Pick<Todo, "isCompleted"> & {
  onCheck: (checked: boolean) => Promise<void>
}

export const TodoCheckbox = ({ isCompleted, onCheck }: Props) => (
  <StyledCheckbox
    checked={isCompleted}
    onChange={({ currentTarget: { checked } }) => onCheck(checked)}
  />
)
