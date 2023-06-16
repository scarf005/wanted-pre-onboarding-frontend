export const genRandomNumstring = (min: number, max: number) => {
  const length = Math.floor(Math.random() * (max - min + 1)) + min
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("")
}

export const genRandomValidEmail = () =>
  `${genRandomNumstring(1, 10)}@${genRandomNumstring(1, 10)}`

export const genRandomValidPassword = () => genRandomNumstring(8, 20)
