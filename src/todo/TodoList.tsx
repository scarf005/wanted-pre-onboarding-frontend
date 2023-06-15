import { Todo } from "../utils/Todo"
import { TodoItem } from "./TodoItem"
import { useTodoList } from "./useTodoList"
import { TodoCheckbox } from "./TodoCheckbox"
import { TodoCreateInput } from "./TodoCreateInput"
import { RemoveTodoButton } from "./RemoveTodoButton"
import { TodoContent } from "./TodoContent"

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
        {todos.map((item) => (
          <li key={item.id}>
            <TodoItem
              todo={item}
              updateTodo={updateTodo}
              both={
                <TodoCheckbox
                  isCompleted={item.isCompleted}
                  onCheck={(v) => updateTodo({ ...item, isCompleted: v })}
                />
              }
              nonEdit={
                <>
                  <TodoContent todo={item.todo} />
                  <RemoveTodoButton onClick={() => removeTodo(item)} />
                </>
              }
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
