import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { TodoItem } from "./TodoItem"
import { useTodoList } from "./useTodoList"
import { useInputState } from "./useInputState"
import { TodoCheckbox } from "./TodoCheckbox"

export type UpdateTodoProps = Pick<Todo, "todo" | "isCompleted">

export const TodoList = () => {
  const { text, clearText, onChange } = useInputState()
  const {
    todos,
    addTodo,
    updateTodo,
    removeTodo,
  } = useTodoList()

  return (
    <main>
      <header>
        <h1>할 일 목록</h1>
      </header>
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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} {...{ updateTodo, removeTodo }}>
              <TodoCheckbox {...todo} updateTodo={updateTodo} />
            </TodoItem>
          </li>
        ))}
      </ul>
    </main>
  )
}
