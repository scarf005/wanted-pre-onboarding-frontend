import { ChangeEvent, useState } from "react"

export type UseInputState = {
  value: string
  empty: boolean
  unchanged: boolean
  clear: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type InputState = Pick<UseInputState, "value" | "onChange">

export const useInputState = (init = ""): UseInputState => {
  const [value, setValue] = useState(init)

  return {
    value,
    empty: value === "",
    unchanged: value === init,
    clear: () => setValue(""),
    onChange: (e) => setValue(e.currentTarget.value),
  }
}
