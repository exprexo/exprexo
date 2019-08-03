# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/exprexo/exprexo/compare/v1.2.3...v2.0.0) (2019-08-03)


### Features

* Add parsers as a default. ([56d3feb](https://github.com/exprexo/exprexo/commit/56d3feb))


### BREAKING CHANGES

* `req.body` will not longer be `undefined`,
 will include a parsed json instead with the request payload.

#### 1.2.2 (2016-11-4)

##### Documentation Changes

* **README:** reorder badges ([924b7097](https://github.com/exprexo/exprexo/commit/924b7097e8e45120ae6ff032ee040022c4f1577c))

#### 1.2.1 (2016-11-4)

##### Chores

* **ci:** add travis and codeclimate ([44a26294](https://github.com/exprexo/exprexo/commit/44a262948c7cf9ef52a574ca886e47e0fa829bcf))

##### Documentation Changes

* **README:** add badges and correct typos ([465b25b4](https://github.com/exprexo/exprexo/commit/465b25b461805ed37c1a9c9ff4d6a7a25b9e98f8))

##### New Features

* **logger:** add default argument, log fn named ([ef47e92d](https://github.com/exprexo/exprexo/commit/ef47e92d8a257e85be51bbb82691eaf53a1351ef))

##### Tests

* **lib:** add full test suite ([880cea2c](https://github.com/exprexo/exprexo/commit/880cea2c438ac69fbb15e9d9ed0fed213b478abb))

### 1.2.0 (2016-11-4)

##### Chores

* **scripts:** add testing scripts and deps ([7cc7a3f4](https://github.com/exprexo/exprexo/commit/7cc7a3f4b02de4cddc7fb5740853fe63033d096e))

##### New Features

* **cli:** harden options ([f0f3b024](https://github.com/exprexo/exprexo/commit/f0f3b02412dc296a79953d0acd2437a81fa58859))

##### Bug Fixes

* **getPort:** always return a promise ([a4a202fa](https://github.com/exprexo/exprexo/commit/a4a202fa300672f3bfb7efd50375dfeee23c1453))

##### Tests

* **cli:** new cli options test suite ([cc6a0dbb](https://github.com/exprexo/exprexo/commit/cc6a0dbb5bc436fd5e651b799cd448877e901e29))

### 1.1.2 (2016-11-4)

##### Documentation Changes

* **README:** add get started section ([20ed0dc5](https://github.com/exprexo/exprexo/commit/20ed0dc53b5f6df2771d4243950d2928f70d5cdd))

### 1.1.0 (2016-11-2)

##### Chores

* **scripts:** add changelog script ([af09419e](https://github.com/exprexo/exprexo/commit/af09419e0e7c939f5fef8541fefc6f9672fc6aa3))

##### Documentation Changes

* **CHANGELOG:** create first version ([6daf64d7](https://github.com/exprexo/exprexo/commit/6daf64d779d5ef5529226ce0630fe1b2d9b8d435))

##### New Features

* **cli:**
  * `verbose` also picked as an `option` ([cbc4b299](https://github.com/exprexo/exprexo/commit/cbc4b299ce5fa58afc5a564b7b4e7b1453479865))
  * first argument is now treated as path ([7c36042f](https://github.com/exprexo/exprexo/commit/7c36042f775f38c559db794f92c8905ccf92e2bf))

##### Code Style Changes

* **cli:** options reordered a-z ([431479ad](https://github.com/exprexo/exprexo/commit/431479ade79d6cbd5723061e714cb5846796f8c2))
