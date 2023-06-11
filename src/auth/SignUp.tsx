import { routes } from "../routes"
import { EmailInput, PasswordInput } from "./Inputs"
import { useInput } from "./useInput"
import { tid } from "../utils/testid"

export const SignUp = () => {
  const emailInput = useInput()
  const passwordInput = useInput()

  const email = emailInput.value
  const password = passwordInput.value
  const isInvalid = [emailInput, passwordInput]
    .every(({ state: { type } }) => type === "err")

  return (
    <main>
      <header>
        <h1>회원가입</h1>
      </header>
      <form
        onSubmit={(e) => {
          e.currentTarget.preventDefault()
          alert(`email: ${email}, password: ${password}`)
        }}
      >
        <fieldset>
          <EmailInput {...emailInput} />
          <PasswordInput
            {...passwordInput}
            inputProps={{ autoComplete: "new-password" }}
          />
        </fieldset>
        <button
          type="submit"
          data-testid={tid.signupButton}
          disabled={isInvalid}
        >
          회원가입
        </button>
      </form>
      <nav>
        <h2>이미 회원이신가요?</h2>
        <a href={routes.signin}>
          로그인하기
        </a>
      </nav>
    </main>
  )
}
