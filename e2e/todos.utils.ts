import { expect, Page, Locator } from "@playwright/test"
import { mockToken } from "./todos.spec"
import { setupMockApi, Todo } from "./todos.mock"
import { randomNum } from "./gen.utils"

const createTodoStorage = (): Todo[] =>
  Array.from({ length: randomNum(1, 4) }, (_, i) => ({
    id: i + 1,
    todo: `todo${i + 1}`,
    isCompleted: randomNum(0, 1) === 1,
    userId: 1,
  }))

export const setupMock = async (page: Page) => {
  const todoStorage = createTodoStorage()

  await setupMockApi(page, todoStorage)
  await page.goto("/signin")
  await page.evaluate(
    (token) => localStorage.setItem("jwt-token", token),
    mockToken,
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
  todoTexts: page.locator("li > label > span"),
})

export const zip = <T, U>(xs: T[], ys: U[]): [T, U][] =>
  xs.map((k, i) => [k, ys[i]])

const checkTodosAreRendered = (todos: Locator, todoStorage: Todo[]) => async () => {
  await expect(todos).toHaveCount(todoStorage.length)

  for (const [todo, mockTodo] of zip(await todos.all(), todoStorage)) {
    await expect(todo.locator("span")).toHaveText(mockTodo.todo)
    await expect(todo.locator("input[type='checkbox']")).toBeChecked({
      checked: mockTodo.isCompleted,
    })
  }
}
