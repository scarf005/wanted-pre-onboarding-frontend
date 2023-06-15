import { useEffect, useState } from "react"
import { Todo } from "../utils/Todo"
import { TodoCreateRequest, TodoDeleteRequest, TodoUpdateRequest } from "../api"
import * as api from "../api"

export type UseTodoList = {
  todos: Todo[]
  addTodo: (req: TodoCreateRequest) => Promise<void>
  removeTodo: (req: TodoDeleteRequest) => Promise<void>
  updateTodo: (req: TodoUpdateRequest) => Promise<void>
}

export const useTodoList = (): UseTodoList => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => setTodos(await api.getTodos())

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (req: TodoCreateRequest) => {
    await api.postTodo(req)
    await fetchTodos()
  }
  const removeTodo = async (req: TodoDeleteRequest) => {
    await api.deleteTodo(req)
    await fetchTodos()
  }
  const updateTodo = async (req: TodoUpdateRequest) => {
    await api.updateTodo(req)
    await fetchTodos()
  }

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
  }
}
