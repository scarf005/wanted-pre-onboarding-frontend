import { LoaderFunction } from "react-router-dom"

// https://github.com/remix-run/react-router/discussions/9792#discussioncomment-4809811
export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D
    : never
