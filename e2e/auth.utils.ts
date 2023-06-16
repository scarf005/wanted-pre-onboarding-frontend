import { Page } from "@playwright/test"
import { genRandomValidEmail, genRandomValidPassword } from "./gen.utils"

const getEmailInput = (page: Page) => page.getByTestId("email-input")
const getPasswordInput = (page: Page) => page.getByTestId("password-input")
export const getSignInButton = (page: Page) => page.getByTestId("signin-button")

export const fillAuth = async (
  page: Page,
  {
    email = genRandomValidEmail(),
    password = genRandomValidPassword(),
  }: { email?: string; password?: string },
) => {
  await getEmailInput(page).fill(email)
  await getPasswordInput(page).fill(password)
}
