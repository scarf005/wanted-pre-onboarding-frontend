import { CSSProperties, HTMLAttributes } from "react"

const style: CSSProperties = {
  width: "10em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

export const StyledSpan = (
  props: HTMLAttributes<HTMLSpanElement>,
) => (
  <span
    style={style}
    {...props}
  />
)
