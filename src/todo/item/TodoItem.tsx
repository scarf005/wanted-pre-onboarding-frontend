import { Todo } from "../../routes/api"
import { Modify } from "../containers/Modify"
import { useBoolean } from "../hooks"
import { ModifyButton, RemoveButton } from "./components/buttons"
import { TodoCheckbox } from "./components/checkbox"
import { Content } from "./components/views"
import classes from "./TodoItem.module.css"

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
          <RemoveButton id={item.id} />
          <ModifyButton onClick={setEdit} />
        </>
      )}
    </label>
  )
}
