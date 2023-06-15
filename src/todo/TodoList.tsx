import { Todo } from "../utils/Todo"
import { TodoItem } from "./TodoItem"
import { useTodoList } from "./useTodoList"
import { TodoCheckbox } from "./TodoCheckbox"
import { TodoCreateInput } from "./TodoCreateInput"

export type UpdateTodoProps = Pick<Todo, "todo" | "isCompleted">

export const TodoList = () => {
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
      <TodoCreateInput addTodo={addTodo} />
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
