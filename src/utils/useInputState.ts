import { ChangeEvent, useState } from "react"
import { Result } from "./Result"

export type UseInputState = {
  value: string
  empty: boolean
  unchanged: boolean
  state: Result<null, string>
  clear: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type InputState = Pick<UseInputState, "value" | "onChange">

export const useInputState = (init = ""): UseInputState => {
  const [value, setValue] = useState(init)

  const empty = value === ""
  const unchanged = value === init
  const state: Result<null, string> = empty
    ? { type: "err", error: "입력란이 비어 있습니다" }
    : { type: "ok", data: null }

  return {
    value,
    empty,
    unchanged,
    state,
    clear: () => setValue(""),
    onChange: (e) => setValue(e.currentTarget.value),
  }
}
