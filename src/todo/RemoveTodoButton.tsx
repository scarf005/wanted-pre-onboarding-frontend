import { tid } from "../utils/ids"

export const RemoveTodoButton = (
  { onClick }: Props,
) => {
  return (
    <button
      type="button"
      data-testid={tid.deleteButton}
      onClick={onClick}
    >
      삭제
    </button>
  )
}
type Props = {
  onClick: () => Promise<void>
}
