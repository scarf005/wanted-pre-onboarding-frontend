import { expect, Page, Locator } from "@playwright/test"
import { setupMockApi, Todo } from "./todos.mock"
import { randomNum } from "./gen.utils"
import { mock_token } from "./mockdata"

type StorageOption = { min?: number; maxCount?: number }

const createTodoStorage = ({ min = 1, maxCount = 6 }: StorageOption): Todo[] =>
  Array.from({ length: randomNum(min, min + maxCount) }, (_, i) => ({
    id: i + 1,
    todo: `todo${i + 1}`,
    isCompleted: randomNum(0, 1) === 1,
    userId: 1,
  }))

export const setupMock = async (page: Page, option?: StorageOption) => {
  const todoStorage = createTodoStorage(option ?? {})

  await setupMockApi(page, todoStorage)
  await page.goto("/signin")
  await page.evaluate(
    (token) => localStorage.setItem("jwt-token", token),
    mock_token,
  )
  await page.goto("/todo")

  const getters = createGetters(page)
  return {
    todoStorage,
    getters,
    checkTodosAreRendered: checkTodosAreRendered(getters.todos, todoStorage),
  }
}

const createGetters = (page: Page) => ({
  newTodoInput: page.getByTestId("new-todo-input"),
  newTodoAddButton: page.getByTestId("new-todo-add-button"),
  todos: page.locator("li > label"),
})

export const zip = <T, U>(xs: T[], ys: U[]): [T, U][] =>
  xs.map((k, i) => [k, ys[i]])

const checkTodosAreRendered =
  (todos: Locator, todoStorage: Todo[]) => async () => {
    await expect(todos).toHaveCount(todoStorage.length)

    for (const [todo, mockTodo] of zip(await todos.all(), todoStorage)) {
      await expect(todo.locator("span")).toHaveText(mockTodo.todo)
      await expect(todo.locator("input[type='checkbox']")).toBeChecked({
        checked: mockTodo.isCompleted,
      })
    }
  }
