import { localStorageKey } from "../utils/ids"
import { useNavigate } from "react-router-dom"
import { paths } from "../routes/paths"
import * as api from "../routes/api"

export const useSignIn = () => {
  const navigate = useNavigate()

  const signin = async (request: api.AuthSignInRequest) => {
    const { response, access_token } = await api.signIn(request)
    if (response.ok) {
      console.log("로그인 성공!")
      localStorage.setItem(localStorageKey.jwtToken, access_token)
      navigate(paths.todo)
    } else {
      alert("로그인 실패!")
    }
  }
  return { signin }
}
