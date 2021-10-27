# [WEB] GitHub Explorer

[![typescript](https://img.shields.io/badge/typescript-4.2.4-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/reactjs-16.13.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-5.1.0-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-24.9.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)

[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/JonathanFerraz/github-explorer/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

This application allow you to search and add repositories to a favorite list and then to see the repositories' issues.

# Screenshots

Click to expand.<br>
<img src="https://raw.githubusercontent.com/JonathanFerraz/github-explorer/master/screenshots/dashboard.png" width="49%"/>
<img src="https://raw.githubusercontent.com/JonathanFerraz/github-explorer/master/screenshots/repository.png" width="49%"/>

# Installing

Easy peasy lemon squeezy:

```
$ yarn
```

Or:

```
$ npm install
```

> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## API

The application uses the [GitHub's API](https://developer.github.com/v3) and it has some rate limitations, if suddenly the app stops to show data take a look at this first!

> See more on about [Rate limiting](https://developer.github.com/v3/#rate-limiting)

# Usage

To start the app run:

```
$ yarn start
```

Or:

```
npm run start
```

# Running the tests

[Jest](https://jestjs.io) was the choice to test the app, to run:

```
$ yarn test
```

Or:

```
$ npm run test
```

## Coverage Report

To generate/update the coverage report:

```
$ yarn coverage
```

Or:

```
$ npm run coverage
```

> You can see the coverage report inside `tests/coverage`.
