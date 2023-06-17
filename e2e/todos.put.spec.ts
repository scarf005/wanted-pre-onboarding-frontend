/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { setupMock, zip } from "./todos.utils"
import { randomAscii, randomNum, randomString } from "./gen.utils"

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
        cancelButton,
        submitButton,
      },
      checkIsEditing,
      checkIsNotEditing,
    } = await setupMock(page)

    for (const [todo, { todo: dbText }] of zip(
      await todos.all(),
      todoStorage,
    )) {
      const prevText = await todo.locator(span).textContent()
      if (prevText === null) throw new Error("prevText is null (not possible)")

      await todo.locator(modifyButton).click()

      // 수정 제출 버튼이 존재하고 활성화되어야 함
      await expect(todo.locator(submitButton)).toBeEnabled()

      // 수정모드 진입시 수정 및 삭제 버튼이 존재하지 않아야 함
      await checkIsEditing(todo)

      // 수정시 입력란이 비어있으면 제출이 안되는지 확인
      await todo.locator(modifyInput).fill("")
      await expect(todo.locator(submitButton)).toBeDisabled()

      // 수정시 입력란이 비어있지 않으면 제출이 되는지 확인
      await todo.locator(modifyInput).fill(randomAscii(randomNum(1, 10)))
      await expect(todo.locator(submitButton)).toBeEnabled()

      await todo.locator(cancelButton).click()

      // 수정모드 종료시 원상복구되어야 함
      await checkIsNotEditing(todo)

      // 제출하지 않았으므로 수정되지 않았어야 함
      await expect(todo.locator(span)).toHaveText(prevText)
      await expect(todo.locator(span)).toHaveText(dbText)
    }
  })

  test("TODO 내용 수정시 변경 내용이 반영되어야 함", async ({ page }) => {
    const {
      todoStorage,
      getters: { todos, span, modifyButton, modifyInput, submitButton },
      checkTodosAreRendered,
      checkIsNotEditing,
    } = await setupMock(page)

    for (const [todo, { todo: dbText }] of zip(
      await todos.all(),
      todoStorage,
    )) {
      const prevText = await todo.locator(span).textContent()
      const newText = randomAscii(randomNum(1, 10))
      if (prevText === null) throw new Error("prevText is null (not possible)")

      await todo.locator(modifyButton).click()
      await todo.locator(modifyInput).fill(newText)
      await expect(todo.locator(submitButton)).toBeEnabled()
      await todo.locator(submitButton).click()

      // 제출했으므로 수정되었어야 함
      await checkIsNotEditing(todo)
      await expect(todo.locator(span)).toHaveText(newText)
      await expect(todo.locator(span)).not.toHaveText(dbText)
      await expect(todo.locator(span)).not.toHaveText(prevText)

      await checkTodosAreRendered()
    }
  })
})
