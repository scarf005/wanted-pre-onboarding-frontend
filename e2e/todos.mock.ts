import { Page } from "@playwright/test"
import { apiUrl } from "./apiUrl"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
}

export type Todo = {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

// Mock API requests
export const setupMockApi = async (page: Page, todoStorage: Todo[]) => {
  const baseUrl = new RegExp(`${apiUrl}/todos(/\\d+)?`)
  await page.route(baseUrl, (route) => {
    const url = new URL(route.request().url())
    const postData = route.request().postData()
    const method = route.request().method()
    if (method === "GET") {
      console.log(
        `current todoStorage: ${(JSON.stringify(todoStorage), null, 2)}`,
      )
      return route.fulfill({
        status: 200,
        body: JSON.stringify(todoStorage),
        headers,
      })
    }
    if (!postData) {
      throw new Error("No post data")
    }
    switch (method) {
      case "POST": {
        // Get the request body and convert to JSON
        const data = JSON.parse(postData)
        const newTodo = {
          id: todoStorage.length + 1,
          todo: data.todo,
          isCompleted: false,
          userId: 1,
        }
        todoStorage.push(newTodo)

        // Respond to the request
        return route.fulfill({
          status: 201,
          body: JSON.stringify(newTodo),
          headers,
        })
      }
      case "PUT": {
        const id = parseInt(url.pathname.split("/").slice(-1)[0])
        const data = JSON.parse(postData)
        const todo = todoStorage.find((todo) => todo.id === id)

        if (todo) {
          todo.todo = data.todo
          todo.isCompleted = data.isCompleted
        }
        return route.fulfill({
          status: 200,
          body: JSON.stringify(todo),
          headers,
        })
      }
      case "DELETE": {
        const id = parseInt(url.pathname.split("/").slice(-1)[0])
        const index = todoStorage.findIndex((todo) => todo.id === id)

        if (index !== -1) {
          todoStorage.splice(index, 1)
        } else {
          throw new Error("No todo found")
        }

        return route.fulfill({
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
      }
    }
  })
}
