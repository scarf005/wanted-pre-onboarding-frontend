import { tid } from "../../utils/ids"

export const EditTodoButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    data-testid={tid.modifyButton}
    onClick={onClick}
  >
    수정
  </button>
)
