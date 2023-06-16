import { ActionFunction, redirect } from "react-router-dom"
import { signIn } from "../routes/api"
import { paths } from "../routes/paths"
import { localStorageKey } from "../utils/ids"
import { unsafeFormData } from "../utils/serialized"

export const signInAction: ActionFunction = async ({ request }) => {
  const res = await signIn(await unsafeFormData(request))
  switch (res.type) {
    case "ok":
      console.log("로그인 성공!")
      localStorage.setItem(localStorageKey.jwtToken, res.data.access_token)
      return redirect(paths.todo)
    case "err":
      alert("로그인에 실패했습니다. 계정이 있고 비밀번호를 올바르게 입력했는지 확인해주세요.")
      console.error(res.error)
      return null
  }
}
