import { expect, Page } from "@playwright/test"
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

  return {
    todoStorage,
    getters: createGetters(page),
    checkTodosAreRendered: checkTodosAreRendered(page, todoStorage),
  }
}

const createGetters = (page: Page) => ({
  newTodoInput: page.getByTestId("new-todo-input"),
  newTodoAddButton: page.getByTestId("new-todo-add-button"),
  todos: page.locator("li > label > span"),
})

const zip = <T, U>(arr1: T[], arr2: U[]): [T, U][] =>
  arr1.map((k, i) => [k, arr2[i]])

const checkTodosAreRendered = (page: Page, todoStorage: Todo[]) => async () => {
  const listItems = page.locator("li > label > span")
  await expect(listItems).toHaveCount(todoStorage.length)

  for (const [listItem, todo] of zip(await listItems.all(), todoStorage)) {
    await expect(listItem).toHaveText(todo.todo)
    await expect(listItem).toBeChecked({ checked: todo.isCompleted })
  }
}
