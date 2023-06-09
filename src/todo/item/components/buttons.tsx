import { Form } from "react-router-dom"
import { tid } from "../../../utils/ids"
import { OnClick } from "./type"
import { TodoDeleteReq } from "../../../routes/api"

export const RemoveButton = ({ id }: { id: number }) => (
  <Form method="DELETE">
    <button
      name={"id" satisfies keyof TodoDeleteReq}
      value={id satisfies TodoDeleteReq["id"]}
      type="submit"
      data-testid={tid.deleteButton}
    >
      삭제
    </button>
  </Form>
)

export const ModifyButton = ({ onClick }: OnClick) => (
  <button type="button" data-testid={tid.modifyButton} onClick={onClick}>
    수정
  </button>
)

export const CancelSubmitButton = ({ onClick }: OnClick) => (
  <button type="button" data-testid={tid.cancelButton} onClick={onClick}>
    취소
  </button>
)
