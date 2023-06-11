import { useState } from "react"
import { UpdateTodoProps } from "./TodoList"
import { Todo } from "../utils/Todo"

// TODO
const userId = 0 as const

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 0, todo: "할 일 1", isCompleted: false, userId },
  ])
  const addTodo = (todo: string) => {
    setTodos([...todos, {
      id: todos.length,
      todo,
      isCompleted: false,
      userId,
    }])
  }
  const removeTodo = ({ id }: Todo) => () =>
    setTodos(todos.filter((todo) => todo.id !== id))

  const updateTodo = ({ id }: Todo) => (update: Partial<UpdateTodoProps>) => {
    console.log(update)
    setTodos(todos.map((t) => t.id === id ? { ...t, ...update } : t))
  }

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
  }
}
