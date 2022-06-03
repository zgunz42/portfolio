# Adi Gunawan - Portfolio

[![codecov](https://codecov.io/gh/zgunz42/portfolio/branch/main/graph/badge.svg?token=H9BBAKGYI0)](https://codecov.io/gh/zgunz42/portfolio) ![Test workflow](https://github.com/zgunz42/portfolio/actions/workflows/test.yml/badge.svg) ![CodeQL workflow](https://github.com/zgunz42/portfolio/actions/workflows/codeql-analysis.yml/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/zgunz42/portfolio.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/zgunz42/portfolio/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/zgunz42/portfolio.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/zgunz42/portfolio/context:javascript) [![Vitamin](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/etow1b&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/etow1b/runs) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/zgunz42/portfolio/blob/main/LICENSE)

Using Vitamin Starter template

## Features

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [Tailwind CSS v3](https://tailwindcss.com) with a [basic reset for form styles](https://github.com/tailwindlabs/tailwindcss-forms) and a [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that automatically sorts classes.
- Use [ESLint](https://eslint.org), [stylelint](https://stylelint.io) and [Prettier](https://prettier.io) on VSCode and before you commit with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- [PWA](https://github.com/antfu/vite-plugin-pwa) with [17/17 Lighthouse score](https://web.dev/pwa-checklist/).
- Write unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).
- Write e2e tests with [Cypress](https://www.cypress.io).
- GitHub Actions for automatic [dependency updates](https://renovatebot.com/), [CodeQL Analysis](https://securitylab.github.com/tools/codeql), running tests and code coverage with [Codecov](https://about.codecov.io/).
- Deploy to [Vercel](vercel.com) with pre-configured [SPA fallback](https://vercel.com/docs/configuration#routes/advanced/spa-fallback).
- Mantine UI for roboust development

## Getting started

Use this repository as a [GitHub template](https://github.com/wtchnm/Vitamin/generate) or use [degit](https://github.com/Rich-Harris/degit) to clone to your machine with an empty git history:

```
npx degit wtchnm/Vitamin#main my-app
```

Then, install the dependencies:

```
pnpm install
```

### Before you start coding

- [x] If you don't plan to use GitHub Actions, delete the `.github` directory.
- [x] Clean up the `cypress/integration/index.spec.ts` file.
- [x] Change the `favicon.png`, `apple-touch-icon.png`, `android-chrome-192x192.png` and `android-chrome-512x512.png`. [favicon.io](https://favicon.io) is a cool tool for generating these assets.
- [x] In the `src` folder, remove the `__tests__`, `api` and `components` folder and the `types.ts` file.
- [x] If you don't plan to use `react-query`, remove the query client logic in the `main.tsx` file.
- [x] Change the title, description and theme color in the `index.html` and `vite.config.ts`. The [Inter](https://rsms.me/inter/) font is included, so remove it if you want.
- [x] Modify or delete the `LICENSE` file.
- [x] Change the `name` field in package.json.

## Scripts

- `pnpm dev` - start a development server with hot reload.
- `pnpm build` - build for production. The generated files will be on the `dist` folder.
- `pnpm preview` - locally preview the production build.
- `pnpm test` - run unit and integration tests related to changed files based on git.
- `pnpm test:ci` - run all unit and integration tests in CI mode.
- `pnpm test:e2e` - run all e2e tests with the Cypress Test Runner.
- `pnpm test:e2e:headless` - run all e2e tests headlessly.
- `pnpm format` - format all files with Prettier.
- `pnpm lint` - runs TypeScript, ESLint and Stylelint.
- `pnpm validate` - runs `lint`, `test:ci` and `test:e2e:ci`.
