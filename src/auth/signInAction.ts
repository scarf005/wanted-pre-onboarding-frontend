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
    case "err": {
      const msg = res.error.message
      const display =
        msg === "Unauthorized"
          ? "이메일 또는 비밀번호가 일치하지 않습니다."
          : msg
      alert(`로그인에 실패했습니다. ${display}`)
      return null
    }
  }
}
