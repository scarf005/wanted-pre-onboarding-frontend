import { EmailInput, PasswordInput } from "./Inputs"
import { useValidatedInput } from "../utils/useInput"
import { tid } from "../utils/ids"
import { paths } from "../routes/paths"
import { Link } from "react-router-dom"
import { useAuth } from "../useAuth"

export const SignUp = () => {
  const auth = useAuth()
  const emailInput = useValidatedInput()
  const passwordInput = useValidatedInput()

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
          e.preventDefault()
          auth.createAccount({ email, password })
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
        <Link to={paths.signin}>
          로그인하기
        </Link>
      </nav>
    </main>
  )
}
