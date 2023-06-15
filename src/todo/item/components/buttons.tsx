import { tid } from "../../../utils/ids"
import { OnClick } from "./type"

export const RemoveButton = ({ onClick }: OnClick) => (
  <button
    type="button"
    data-testid={tid.deleteButton}
    onClick={onClick}
  >
    삭제
  </button>
)

export const ModifyButton = ({ onClick }: OnClick) => (
  <button
    type="button"
    data-testid={tid.modifyButton}
    onClick={onClick}
  >
    수정
  </button>
)

export const CancelSubmitButton = ({ onClick }: OnClick) => (
  <button
    type="submit"
    data-testid={tid.cancelButton}
    onClick={onClick}
  >
    취소
  </button>
)
