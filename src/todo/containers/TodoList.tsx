import { CreateItem } from "./CreateItem"
import { TodoItem } from "../item/TodoItem"
import { useLoaderData } from "react-router-dom"
import { getTodos } from "../../api"
import { LoaderData } from "../../routes/type"

export const TodoList = () => {
  const todos = useLoaderData() as LoaderData<typeof getTodos>

  return (
    <main>
      <Header />
      <CreateItem />
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <TodoItem item={item} />
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
