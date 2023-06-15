import { ChangeEvent, useState } from "react"

export const useInputState = (init = "") => {
  const [text, setText] = useState(init)

  const clearText = () => setText("")
  const onChange = (
    { currentTarget: { value } }: ChangeEvent<HTMLInputElement>,
  ) => setText(value)

  return { text, clearText, onChange }
}
