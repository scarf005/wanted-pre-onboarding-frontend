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

## 테스트 및 데모

https://github.com/scarf005/wanted-pre-onboarding-frontend/assets/54838975/c0e67c96-aea9-4c32-a659-a3d90bf02acd

[playwright](https://playwright.dev)를 이용해 요구사항 구현을 검증했습니다.

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
