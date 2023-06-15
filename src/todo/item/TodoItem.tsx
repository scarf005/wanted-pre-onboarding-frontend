import { Todo } from "../../api"
import { Modify } from "../containers/Modify"
import { useBoolean, UseTodoList } from "../hooks"
import {
  CancelSubmitButton,
  ModifyButton,
  RemoveButton,
} from "./components/buttons"
import { TodoCheckbox } from "./components/checkbox"
import { Content, Label } from "./components/views"

export type Props =
  & { item: Todo }
  & Pick<UseTodoList, "updateTodo" | "removeTodo">

export const TodoItem = ({ item, updateTodo, removeTodo }: Props) => {
  const { val: isEdit, on: setEdit, off: unsetEdit } = useBoolean(false)

  return (
    <Label>
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
            <RemoveButton onClick={() => removeTodo(item)} />
            <ModifyButton onClick={setEdit} />
          </>
        )}
    </Label>
  )
}