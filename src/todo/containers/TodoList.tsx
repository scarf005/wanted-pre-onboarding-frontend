import { CreateItem } from "./CreateItem"
import { TodoItem } from "../item/TodoItem"
import { useLoaderData } from "react-router-dom"
import { getTodos } from "../../api"
import { LoaderData } from "../../routes/type"

export const TodoList = () => {
  return (
    <main>
      <Header />
      <CreateItem />
      <TodoItems />
    </main>
  )
}

const Header = () => (
  <header>
    <h1>할 일 목록</h1>
  </header>
)

const TodoItems = () => {
  const todos = useLoaderData() as LoaderData<typeof getTodos>
  return (
    <ul>
      {todos.map((item) => (
        <li key={item.id}>
          <TodoItem {...item} />
        </li>
      ))}
    </ul>
  )
}
