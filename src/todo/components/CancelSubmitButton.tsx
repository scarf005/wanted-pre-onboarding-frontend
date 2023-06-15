import { tid } from "../../utils/ids"

export const CancelSubmitButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="submit"
    data-testid={tid.cancelButton}
    onClick={onClick}
  >
    취소
  </button>
)
