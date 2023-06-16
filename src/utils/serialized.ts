// workarounds for react router limitation
// https://github.com/remix-run/react-router/discussions/9858

export const serialized = (item: Record<string, unknown>): FormData => {
  const formData = new FormData()
  formData.append("payload", JSON.stringify(item))
  return formData
}

export const unsafeFormData = async <T,>(request: Request) =>
  Object.fromEntries(await request.formData()) as T

export const unsafePayload = async <T,>(request: Request) => {
  const { payload } = await unsafeFormData<{ payload: string }>(request)
  return JSON.parse(payload) as T
}
