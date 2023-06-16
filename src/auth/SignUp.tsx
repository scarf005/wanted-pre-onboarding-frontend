import { EmailInput, PasswordInput } from "./Inputs"
import { useValidatedInput } from "../utils/useInput"
import { tid } from "../utils/ids"
import { paths } from "../routes/paths"
import { Form, Link } from "react-router-dom"

export const SignUp = () => (
  <>
    <Header />
    <SignUpForm />
    <ToSignIn />
  </>
)

const Header = () => (
  <header>
    <h1>회원가입</h1>
  </header>
)

const SignUpForm = () => {
  const email = useValidatedInput()
  const password = useValidatedInput()

  const isInvalid = [email, password]
    .every(({ state: { type } }) => type === "err")

  return (
    <Form method="POST">
      <fieldset>
        <EmailInput {...email} />
        <PasswordInput
          {...password}
          inputProps={{ autoComplete: "new-password" }}
        />
      </fieldset>
      <Submit isInvalid={isInvalid} />
    </Form>
  )
}

const Submit = ({ isInvalid }: { isInvalid: boolean }) => (
  <button
    type="submit"
    data-testid={tid.signupButton}
    disabled={isInvalid}
  >
    회원가입
  </button>
)

const ToSignIn = () => {
  const { signin } = paths
  return (
    <nav aria-labelledby={signin}>
      <h2>이미 회원이신가요?</h2>
      <Link to={signin} id={signin}>
        로그인하기
      </Link>
    </nav>
  )
}
