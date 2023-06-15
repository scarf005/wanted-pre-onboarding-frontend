import { useState } from "react"
import { tid } from "../utils/ids"
import { Todo } from "../utils/Todo"
import { TodoItem } from "./TodoItem"
import { useTodoList } from "./useTodoList"

export type UpdateTodoProps = Pick<Todo, "todo" | "isCompleted">

export const TodoList = () => {
  const [text, setText] = useState("")
  const {
    todos,
    addTodo,
    ...itemApi
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
          setText("")
        }}
      >
        <input
          data-testid={tid.newTodoInput}
          value={text}
          onChange={({ currentTarget: { value } }) => setText(value)}
        />
        <button type="submit" data-testid={tid.newTodoAddButton}>
          추가
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} {...itemApi} />
          </li>
        ))}
      </ul>
    </main>
  )
}
