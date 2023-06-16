import { EmailInput, PasswordInput } from "./Inputs"
import { useValidatedInput } from "../utils/useInput"
import { tid } from "../utils/ids"
import { paths } from "../routes/paths"
import { Link, useNavigate } from "react-router-dom"
import * as api from "../api"

export const useSignUp = () => {
  const navigate = useNavigate()

  const signup = async (request: api.AuthSignUpRequest) => {
    const response = await api.signUp(request)
    if (response.ok) {
      console.log("계정 생성 성공!")
      navigate(paths.signin)
    } else {
      alert("계정 생성 실패!")
    }
  }
  return { signup }
}

export const SignUp = () => {
  const { signup } = useSignUp()
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
          signup({ email, password })
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
