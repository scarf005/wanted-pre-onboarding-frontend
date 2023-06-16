import { Todo } from "../../api"
import { Modify } from "../containers/Modify"
import { useBoolean } from "../hooks"
import {
  ModifyButton,
  RemoveButton,
} from "./components/buttons"
import { TodoCheckbox } from "./components/checkbox"
import { Content } from "./components/views"
import "./TodoItem.module.css"

export type Props = { item: Todo }

export const TodoItem = ({ item }: Props) => {
  const { val: isEdit, on: setEdit, off: unsetEdit } = useBoolean(false)

  return (
    <label>
      <TodoCheckbox {...item} />
      {isEdit
        ? (
          <Modify
            item={item}
            unsetEdit={unsetEdit}
          />
        )
        : (
          <>
            <Content todo={item.todo} />
            <RemoveButton id={item.id} />
            <ModifyButton onClick={setEdit} />
          </>
        )}
    </label>
  )
}
