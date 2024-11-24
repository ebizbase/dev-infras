# Changelog

## [3.0.0](https://github.com/ebizbase/dev-infras/compare/nx-docker-v2.0.0...nx-docker-v3.0.0) (2024-11-24)


### ⚠ BREAKING CHANGES

* **nx-docker:** Change the api of the Docker executor schema The `registries`, `version`, and `namespace` options have been added to the Docker executor schema. This change is backwards incompatible and may require updates to existing configurations.

### Features

* **nx-docker:** add labels options to docker build executor ([7822a69](https://github.com/ebizbase/dev-infras/commit/7822a69fdd3737ac63c0ee5ca393dadc7a8504de))
* **nx-docker:** add load and push optiions to build executor ([5cc3278](https://github.com/ebizbase/dev-infras/commit/5cc3278c87678a1a0054a496fd1db7f0756a8d27))
* **nx-docker:** add registries, version, and namespace options to Docker executor schema ([348567d](https://github.com/ebizbase/dev-infras/commit/348567d2ccf130b1fee13c844d07b86c24141722))

## [2.0.0](https://github.com/ebizbase/dev-infras/compare/nx-docker-v1.0.0...nx-docker-v2.0.0) (2024-11-22)


### ⚠ BREAKING CHANGES

* **nx-docker:** The ci options have been removed from build executor.

### Miscellaneous Chores

* **nx-docker:** renove unused ci options ([398f53c](https://github.com/ebizbase/dev-infras/commit/398f53c967f4e58e2fab5e385be627274fc884e5))

## 1.0.0 (2024-11-22)


### Features

* **nx-docker:** add build executor ([2df236c](https://github.com/ebizbase/dev-infras/commit/2df236c038a0e8d7fb4b37d8b00c5b52aac70c92))


### Bug Fixes

* **nx-docker:** update publish  api ([0e61321](https://github.com/ebizbase/dev-infras/commit/0e613213df35b62bfe96f79bc7869dfb02772997))
