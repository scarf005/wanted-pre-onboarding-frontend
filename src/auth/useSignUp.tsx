import { paths } from "../routes/paths"
import { useNavigate } from "react-router-dom"
import * as api from "../routes/api"

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
