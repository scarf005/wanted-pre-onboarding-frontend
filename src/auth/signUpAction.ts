import { paths } from "../routes/paths"
import { ActionFunction, redirect } from "react-router-dom"
import { signUp } from "../routes/api"
import { unsafeFormData } from "../utils/serialized"

export const signUpAction: ActionFunction = async ({ request }) => {
  const res = await signUp(await unsafeFormData(request))
  switch (res.type) {
    case "ok":
      console.log("회원가입 성공!")
      return redirect(paths.signin)
    case "err":
      alert("회원가입에 실패했습니다. 다른 계정과 이메일이 겹치는지 확인해주세요.")
      console.error(res.error)
      return null
  }
}
