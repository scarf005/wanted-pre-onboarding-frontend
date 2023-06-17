export const randomElement = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)]

export const randomUnicode = () =>
  String.fromCharCode(Math.floor(Math.random() * 65535))

export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const randomString = (length: number) =>
  Array.from({ length }, randomUnicode).join("")

export const randomUnicodeWithoutAt = (length: number) =>
  [...randomString(length)].map((x) => (x === "@" ? "뷁" : x)).join("")

export const genRandomValidEmail = () => {
  const [begin, end] = [
    randomUnicodeWithoutAt(randomNum(1, 10)),
    randomUnicodeWithoutAt(randomNum(1, 10)),
  ]
  return randomElement([`${begin}@`, `@${end}`, `${begin}@${end}`])
}

export const genRandomValidPassword = () => randomString(randomNum(8, 20))
