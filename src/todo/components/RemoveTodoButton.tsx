import { tid } from "../../utils/ids"

type Props = {
  onClick: () => Promise<void>
}
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
