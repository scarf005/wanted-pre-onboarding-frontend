import { tid } from "../utils/ids"
import { UseTodoList } from "./useTodoList"
import { useInputState } from "./useInputState"

export const TodoCreateInput = ({ addTodo }: Pick<UseTodoList, "addTodo">) => {
  const { text, clearText, onChange } = useInputState()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await addTodo({ todo: text })
        clearText()
      }}
    >
      <input
        data-testid={tid.newTodoInput}
        value={text}
        onChange={onChange}
      />
      <button type="submit" data-testid={tid.newTodoAddButton}>
        추가
      </button>
    </form>
  )
}
