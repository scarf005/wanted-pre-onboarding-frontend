import {  HTMLAttributes } from "react"

export const StyledSpan = (
  props: HTMLAttributes<HTMLSpanElement>,
) => (
  <span
    style={{
      width: "10em",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    {...props}
  />
)
