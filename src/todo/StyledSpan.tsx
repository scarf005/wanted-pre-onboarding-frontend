import { forwardRef, HTMLAttributes, Ref } from "react"

export const StyledSpan = forwardRef((
  props: HTMLAttributes<HTMLSpanElement>,
  ref: Ref<HTMLSpanElement>,
) => (
  <span
    style={{
      width: "10em",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    {...props}
    ref={ref}
  />
))
