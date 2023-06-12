import { createContext, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalJwtStorage } from "./utils/jwt"
import { paths } from "./routes/paths"
import { AuthSignInRequest, AuthSignUpRequest, signIn, signUp } from "./api"

export const AuthContext = createContext<AuthContext | null>(null)

export type AuthContext = {
  createAccount: (request: AuthSignUpRequest) => Promise<void>
  login: (request: AuthSignInRequest) => Promise<void>
  logout: () => void
  status: "authenticated" | "unauthenticated"
}

type Props = { children: ReactNode }
export const AuthProvider = ({ children }: Props) => {
  const [jwt, setJwt] = useLocalJwtStorage()
  const navigate = useNavigate()

  const isLoggedIn = jwt
  const status = isLoggedIn ? "authenticated" : "unauthenticated"

  const createAccount = async (request: AuthSignUpRequest) => {
    const response = await signUp(request)
    if (response.ok) {
      console.log("계정 생성 성공!")
      navigate(paths.signin)
    } else {
      alert("계정 생성 실패!")
    }
  }

  const login = async (request: AuthSignInRequest) => {
    const { response, access_token } = await signIn(request)
    if (response.ok) {
      console.log("로그인 성공!")
      setJwt(access_token)
      navigate(paths.todo)
    } else {
      alert("로그인 실패!")
    }
  }

  const logout = () => {
    setJwt("")
    navigate(paths.signin, { replace: true })
  }

  return (
    <AuthContext.Provider
      value={{ createAccount, login, logout, status }}
    >
      {children}
    </AuthContext.Provider>
  )
}
