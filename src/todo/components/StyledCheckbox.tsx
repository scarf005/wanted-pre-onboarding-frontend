import { InputHTMLAttributes } from "react"

export const StyledCheckbox = (
  props: InputHTMLAttributes<HTMLInputElement>,
) => (
  <input
    {...props}
    type="checkbox"
    style={{
      marginRight: "0.5em",
    }}
  />
)
