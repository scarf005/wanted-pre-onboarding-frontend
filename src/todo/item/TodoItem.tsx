import { Todo } from "../../routes/api"
import { Modify } from "../containers/Modify"
import { ModifyButton, RemoveButton } from "./components/buttons"
import { TodoCheckbox } from "./components/checkbox"
import { Content } from "./components/views"
import classes from "./TodoItem.module.css"
import { useBoolean } from "./useBoolean"

export const TodoItem = (item: Todo) => {
  const { val: isEdit, on: setEdit, off: unsetEdit } = useBoolean(false)

  return (
    <label className={classes.label}>
      <TodoCheckbox {...item} />
      {isEdit ? (
        <Modify item={item} unsetEdit={unsetEdit} />
      ) : (
        <>
          <Content {...item} />
          <ModifyButton onClick={setEdit} />
          <RemoveButton id={item.id} />
        </>
      )}
    </label>
  )
}
