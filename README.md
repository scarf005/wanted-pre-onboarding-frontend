# PicoTODO@CRA: [선발 과제][과제] 구현

![할 일 목록][할-일-목록]

<div align="center">

<!-- [![Github Pages][pages-shield]][배포-pages] -->
<!-- https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white -->

[![Deploy Status](https://img.shields.io/github/deployments/scarf005/wanted-pre-onboarding-frontend/production?label=deploy&logo=vercel&logoColor=white&style=for-the-badge)][배포-vercel]
[![E2E Test Status](https://img.shields.io/github/actions/workflow/status/scarf005/wanted-pre-onboarding-frontend/playwright.yml?label=E2E&style=for-the-badge)](https://github.com/scarf005/wanted-pre-onboarding-frontend/actions/workflows/playwright.yml)

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)][CRA]
[![React Router](https://img.shields.io/badge/react%20router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/playwright-%23F24E1E.svg?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

</div>

PicoTODO는 [Create React App][CRA]으로 만든 초소형 TODO 웹페이지로, 원티드 [선발 과제][과제] 기능을 구현합니다.

## [배포 링크][배포-vercel]

[![Vercel][vercel-shield]][배포-vercel]
<!-- [![Github Pages][pages-shield]][배포-pages] -->

## 실행 방법

```sh
# npm
npm install
npm start

# pnpm
pnpm install
pnpm start

# playwright 테스트 방법
npm exec playwright test
pnpm exec playwright test --ui # UI 모드
pnpm exec playwright show-report
```

## 스크린샷

<details><summary>펼치기</summary>

### 회원가입

![회원가입][회원가입]

### 로그인

![로그인][로그인]

### 할 일 목록

![할 일 목록][할-일-목록]

</details>

## 지원자 성명

김영현

## 사용 라이브러리

- React Router
- Ky (HTTP 클라이언트)
- Typescript, eslint, prettier (개발 도구)
- gh-pages (배포)
- playwright (E2E 테스트)

## 체크리스트

<details><summary>펼치기</summary>

### :: 1. 로그인 / 회원가입

- [x] `/signup` 경로에 회원가입 기능을 개발해주세요
- [x] `/signin` 경로에 로그인 기능을 개발해주세요
- [x] 페이지 안에 이메일 input, 비밀번호 input, 제출 button이 포함된 형태로 구성해주세요

  - [x] 이메일 input에 `data-testid="email-input"` 속성을 부여해주세요
  - [x] 패스워드 input에 `data-testid="password-input"` 속성을 부여해주세요
  - [x] 회원가입 페이지에는 회원가입 button에 `data-testid="signup-button"` 속성을 부여해주세요
  - [x] 로그인 페이지에는 로그인 button에 `data-testid="signin-button"` 속성을 부여해주세요

#### Assignment 1

- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

  - [x] 이메일 조건: `@` 포함
  - [x] 비밀번호 조건: 8자 이상
  - [x] 이메일과 비밀번호의 유효성 검사 조건은 별도의 추가 조건 부여 없이 위의 조건대로만 진행해주세요 (e.g. 비밀번호 유효성 검사에 특수문자 포함 등의 새로운 조건을 추가하는 행위, 비밀번호 확인 조건을 추가하는 행위 등은 지양해주세요)

- [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여해주세요

#### Assignment 2

- 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요

#### Assignment 3

- 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요

  - 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
  - 응답받은 JWT는 로컬 스토리지에 저장해주세요

#### Assignment 4

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

  - 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

---

### :: 2. TODO LIST

#### Assignment 5

- `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
- TODO의 완료 여부는 `<input type="checkbox" />`를 통해 표현해주세요
- TODO는 `<li>` tag를 이용해 감싸주세요

```html
<li>
  <label>
    <input type="checkbox" />
    <span>TODO 1</span>
  </label>
</li>
<li>
  <label>
    <input type="checkbox" />
    <span>TODO 2</span>
  </label>
</li>
```

#### Assignment 6

- 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요

  - TODO 입력 input에는 `data-testid="new-todo-input"` 속성을 부여해주세요
  - TODO 추가 button에는 `data-testid="new-todo-add-button"` 속성을 부여해주세요

    ```html
    <input data-testid="new-todo-input" />
    <button data-testid="new-todo-add-button">추가</button>
    ```

- 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.

#### Assignment 7

- TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

#### Assignment 8

- TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요

  - 수정 버튼에는 `data-testid="modify-button"` 속성을 부여해주세요
  - 삭제 버튼에는 `data-testid="delete-button"` 속성을 부여해주세요

    ```html
    <li>
      <label>
        <input type="checkbox" />
        <span>TODO 1</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
    ```

#### Assignment 9

- 투두 리스트의 삭제 기능을 구현해주세요

  - 투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요

#### Assignment 10

- 투두 리스트의 수정 기능을 구현해주세요

  - TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
  - 수정모드에서는 TODO의 내용을 변경할 수 있어야 합니다.
  - 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경해주세요
    - 수정 input창에는 `data-testid="modify-input"` 속성을 부여해주세요
  - 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요
    - 제출버튼에는 `data-testid="submit-button"` 속성을 부여해주세요
    - 취소버튼에는 `data-testid="cancel-button"` 속성을 부여해주세요
  - 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
  - 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요

    ```html
    <input data-testid="modify-input" />
    <button data-testid="submit-button">제출</button>
    <button data-testid="cancel-button">취소</button>
    ```

</details>

## 라이선스

[AGPL 3.0](./LICENSE)


[pages-shield]: https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white
[vercel-shield]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white

[CRA]: https://github.com/facebook/create-react-app
[과제]: https://github.com/walking-sunset/selection-task
[배포-vercel]: https://scarf005-wanted-pre-onboarding-frontend.vercel.app
[배포-pages]: https://scarf005.github.io/wanted-pre-onboarding-frontend/
[회원가입]: https://github.com/scarf005/wanted-pre-onboarding-frontend/assets/54838975/91454c60-bb3e-4863-bc7f-7f2d93404a3c
[로그인]: https://github.com/scarf005/wanted-pre-onboarding-frontend/assets/54838975/2a165e93-c299-4298-bb2e-a6385dd9cb0e
[할-일-목록]: https://github.com/scarf005/wanted-pre-onboarding-frontend/assets/54838975/c8827760-723a-4bac-987a-accbd561f74d
