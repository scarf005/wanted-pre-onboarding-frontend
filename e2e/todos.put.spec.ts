/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { setupMock, zip } from "./todos.utils"
import { randomNum, randomString } from "./gen.utils"

test.describe("TODO 목록 PUT", () => {
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
      await expect(checkbox).toBeChecked({ checked: !prev })
    }
    await checkTodosAreRendered()
  })

  // Assignment 8
  test("생성 및 삭제 버튼이 각 TODO별로 존재해야 함", async ({ page }) => {
    const {
      getters: { todos, modifyButton, deleteButton },
    } = await setupMock(page)

    for (const todo of await todos.all()) {
      await expect(todo.locator(modifyButton)).toBeVisible()
      await expect(todo.locator(deleteButton)).toBeVisible()
    }
  })

  // Assignment 10
  test("수정 버튼을 누르고 수정하더라도 취소하면 원래 TODO가 보여야 함", async ({
    page,
  }) => {
    const {
      todoStorage,
      getters: {
        todos,
        span,
        modifyButton,
        modifyInput,
        deleteButton,
        cancelButton,
        submitButton,
      },
    } = await setupMock(page)

    for (const [todo, { todo: dbText }] of zip(
      await todos.all(),
      todoStorage,
    )) {
      const prevText = await todo.locator(span).textContent()
      if (prevText === null) throw new Error("prevText is null (not possible)")

      await todo.locator(modifyButton).click()
      // 수정모드 진입시 수정 및 삭제 버튼이 존재하지 않아야 함
      await expect(todo.locator(modifyButton)).not.toBeVisible()
      await expect(todo.locator(deleteButton)).not.toBeVisible()

      // 수정시 입력란이 비어있으면 제출이 안되는지 확인
      await todo.locator(modifyInput).fill("")
      await expect(todo.locator(submitButton)).toBeDisabled()

      // 수정시 입력란이 비어있지 않으면 제출이 되는지 확인
      await todo.locator(modifyInput).fill(randomString(randomNum(1, 10)))
      await expect(todo.locator(submitButton)).toBeEnabled()

      await todo.locator(cancelButton).click()

      // 수정모드 종료시 수정 및 삭제 버튼이 존재해야 함
      await expect(todo.locator(modifyButton)).toBeVisible()
      await expect(todo.locator(deleteButton)).toBeVisible()

      // 제출하지 않았으므로 수정되지 않았어야 함
      await expect(todo.locator(span)).toHaveText(prevText)
      await expect(todo.locator(span)).toHaveText(dbText)
    }
  })
})

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
