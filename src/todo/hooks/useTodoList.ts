import { ReactNode, useEffect, useState } from "react"
import { Todo } from "../../utils/Todo"
import {
  TodoCreateRequest,
  TodoDeleteRequest,
  TodoUpdateRequest,
} from "../../api"
import * as api from "../../api"

export type UseTodoList = {
  todos: Todo[]
  invalidateTodos: () => Promise<void>
  addTodo: (req: TodoCreateRequest) => Promise<void>
  removeTodo: (req: TodoDeleteRequest) => Promise<void>
  updateTodo: (req: TodoUpdateRequest) => Promise<void>
}

const withRefresh =
  (refresh: () => Promise<void>) =>
  <T>(fn: (_: T) => Promise<unknown>) =>
  async (req: T) => {
    await fn(req)
    await refresh()
  }

export const useTodoList = (): UseTodoList => {
  const [todos, setTodos] = useState<Todo[]>([])
  const getTodos = async () => setTodos(await api.getTodos())

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = withRefresh(getTodos)(api.postTodo)
  const removeTodo = withRefresh(getTodos)(api.deleteTodo)
  const updateTodo = withRefresh(getTodos)(api.updateTodo)

  return {
    todos,
    invalidateTodos: getTodos,
    addTodo,
    removeTodo,
    updateTodo,
  }
}
