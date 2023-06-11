import { useState } from "react"
import { tid } from "../utils/testid"
import { Todo } from "../utils/Todo"
import { TodoItem } from "./TodoItem"
import { useTodoList } from "./useTodoList"

export type UpdateTodoProps = Pick<Todo, "todo" | "isCompleted">

export const TodoList = () => {
  const [text, setText] = useState("")
  const {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
  } = useTodoList()

  return (
    <main>
      <header>
        <h1>할 일 목록</h1>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(text)
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
            <TodoItem
              {...todo}
              remove={removeTodo(todo)}
              update={updateTodo(todo)}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
