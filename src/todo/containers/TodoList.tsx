import { useTodoList } from "../hooks/useTodoList"
import { CreateItem } from "./CreateItem"
import { TodoItem } from "../item/TodoItem"

export const TodoList = () => {
  const { todos, addTodo, ...mutation } = useTodoList()

  return (
    <main>
      <Header />
      <CreateItem addTodo={addTodo} />
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <TodoItem item={item} {...mutation} />
          </li>
        ))}
      </ul>
    </main>
  )
}

const Header = () => (
  <header>
    <h1>할 일 목록</h1>
  </header>
)
