import { Todo } from "../../api"
import { Modify } from "../containers/Modify"
import { useBoolean, UseTodoList } from "../hooks"
import {
  CancelSubmitButton,
  ModifyButton,
  RemoveButton,
} from "./components/buttons"
import { TodoCheckbox } from "./components/checkbox"
import { Content } from "./components/views"
import "./TodoItem.module.css"

export type Props =
  & { item: Todo }
  & Pick<UseTodoList, "updateTodo" | "removeTodo">

export const TodoItem = ({ item, updateTodo }: Props) => {
  const { val: isEdit, on: setEdit, off: unsetEdit } = useBoolean(false)

  return (
    <label>
      <TodoCheckbox
        isCompleted={item.isCompleted}
        onCheck={(v) => updateTodo({ ...item, isCompleted: v })}
      />
      {isEdit
        ? (
          <Modify
            init={item.todo}
            onSubmit={async ({ todo }) => {
              await updateTodo({ ...item, todo })
              unsetEdit()
            }}
            cancelButton={<CancelSubmitButton onClick={unsetEdit} />}
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
