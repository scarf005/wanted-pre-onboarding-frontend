import { test, expect } from "@playwright/test"
import { setupMock } from "./todos.utils"

test.describe("TODO 목록 POST", () => {
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
      getters: { newTodoInput, newTodoAddButton, span, todos },
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
      await expect(todos).toHaveCount(todoStorage.length)
      await expect(todos.last().locator(span)).toHaveText(newTodo)

      // 전체 목록 렌더링 확인
      await checkTodosAreRendered()

      // 새로고침 시에도 새 TODO가 남아있는지 확인
      await page.reload()

      // 새 TODO가 여전히 추가되었는지 확인
      await expect(todos).toHaveCount(todoStorage.length)
      await expect(todos.last().locator(span)).toHaveText(newTodo)

      // 전체 목록 렌더링 확인
      await checkTodosAreRendered()
    }
  })
})
