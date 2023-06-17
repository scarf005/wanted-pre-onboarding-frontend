/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { setupMock, zip } from "./todos.utils"

// Mock JWT token
export const mockToken = "mock_jwt_token"

// Assignment 5 to 10
test.describe("TODO List 구현", () => {
  // Assignment 5
  test("로그인 상태에서 접근 시 TODO 목록이 보여야 함", async ({ page }) => {
    const { checkTodosAreRendered } = await setupMock(page)

    await checkTodosAreRendered()
    await page.reload()
    await checkTodosAreRendered()
  })

  test("입력란이 비어있으면 TODO 추가 버튼이 비활성화 되어야 함", async ({
    page,
  }) => {
    const {
      getters: { newTodoInput, newTodoAddButton },
    } = await setupMock(page)

    expect(await newTodoAddButton.isEnabled()).toBe(false)
    await newTodoInput.fill("new todo")
    expect(await newTodoAddButton.isEnabled()).toBe(true)
    await newTodoInput.fill("")
    expect(await newTodoAddButton.isEnabled()).toBe(false)
    await page.reload()
    expect(await newTodoAddButton.isEnabled()).toBe(false)
    await newTodoInput.fill("new todo")
    expect(await newTodoAddButton.isEnabled()).toBe(true)
    await newTodoInput.fill("")
    expect(await newTodoAddButton.isEnabled()).toBe(false)
  })

  // Assignment 6
  test("새 TODO 추가가 페이지 새로고침 후에도 동작", async ({ page }) => {
    const {
      todoStorage,
      getters: { newTodoInput, newTodoAddButton },
      checkTodosAreRendered,
    } = await setupMock(page)

    for (const newTodo of [
      "new todo",
      "adfsafsd",
      "와!",
      "8293ㄹ98*(&)FAFY(A",
    ]) {
      await newTodoInput.fill(newTodo)
      await newTodoAddButton.click()

      // 여전히 /todo 페이지에 있는지 확인
      await expect(page).toHaveURL(/\/todo$/)

      // 새 TODO가 추가되었는지 확인
      const newTodos = page.locator("li > label > span")
      await expect(newTodos).toHaveCount(todoStorage.length)
      await expect(newTodos.last()).toHaveText(newTodo)

      // 전체 목록 렌더링 확인
      await checkTodosAreRendered()

      // 새로고침 시에도 새 TODO가 남아있는지 확인
      await page.reload()

      // 새 TODO가 여전히 추가되었는지 확인
      await expect(newTodos).toHaveCount(todoStorage.length)
      await expect(newTodos.last()).toHaveText(newTodo)

      // 전체 목록 렌더링 확인
      await checkTodosAreRendered()
    }
  })

  // Assignment 7
  test("TODO 완료 상태 변경", async ({ page }) => {
    const {
      todoStorage,
      getters: { todos },
      checkTodosAreRendered,
    } = await setupMock(page)

    const prevCompletions = todoStorage.map((todo) => todo.isCompleted)

    for (const [todo, prev] of zip(await todos.all(), prevCompletions)) {
      const checkbox = todo.locator("input[type='checkbox']")
      await checkbox.click()
      await page.waitForTimeout(100)
      await expect(checkbox).toBeChecked({ checked: !prev })
    }
    await checkTodosAreRendered()
  })

  // // Assignment 8
  // test("should display modify and delete buttons", async ({ page }) => {
  //   const todoStorage = createTodoStorage()
  //   await setupMock(page, todoStorage)
  //   const modifyButton = await page.$(
  //     'li:first-child > button[data-testid="modify-button"]',
  //   )
  //   const deleteButton = await page.$(
  //     'li:first-child > button[data-testid="delete-button"]',
  //   )

  //   expect(Boolean(modifyButton)).toEqual(true)
  //   expect(Boolean(deleteButton)).toEqual(true)
  // })

  // // Assignment 9
  // test("should delete a todo", async ({ page }) => {
  //   const todoStorage = createTodoStorage()
  //   await setupMock(page, todoStorage)

  //   const initialTodoCount = await page.$$eval("li", (li) => li.length)
  //   await page.click('li:first-child > button[data-testid="delete-button"]')
  //   const finalTodoCount = await page.$$eval("li", (li) => li.length)

  //   expect(initialTodoCount - 1).toBe(finalTodoCount)
  // })

  // // Assignment 10
  // test("should update a todo", async ({ page }) => {
  //   const todoStorage = createTodoStorage()
  //   await setupMock(page, todoStorage)
  //   const newTodo = "updated todo"

  //   await page.click('li:first-child > button[data-testid="modify-button"]')
  //   await page.fill(
  //     'li:first-child > input[data-testid="modify-input"]',
  //     newTodo,
  //   )
  //   await page.click('li:first-child > button[data-testid="submit-button"]')

  //   const firstTodo = await page.$("li:first-child > label > span")
  //   expect(await firstTodo?.textContent()).toBe(newTodo)
  // })
})
