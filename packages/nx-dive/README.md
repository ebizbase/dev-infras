# nx-dive
The NX plugin to using [dive](https://github.com/wagoodman/dive) for analyze image

## Prerequisites

- Ensure you have Docker installed and running on your machine.
- Ensure you have NX installed in your workspace.

## Installation

To install plugin run the following command:

```bash
npm install -D @ebizbase/nx-dive
yarn add -D @ebizbase/nx-dive
pnpm add -D @ebizbase/nx-dive
```

## Analyze docker image

The example of @ebizbase/nx-dive:analyze executor

```json
{
  "targets": {
    "analyze": {
      "executor": "@ebizbase/nx-docker:analyze",
      "options": {
        "image": "your-app:latest"
      }
    }
  }
}
```

You can validate of image with `ci` option like this

```json
{
  "targets": {
    "analyze": {
      "dependsOn": ["build"],
      "executor": "@ebizbase/nx-docker:analyze",
      "options": {
        "image": "your-app:latest",
        "ci": true,
        "highestUserWastedRatio": 0.1
      }
    }
  }
}
```

Or in ci/cd you can overwrite config with template `--[options]=value.` Example

```shell
nx run project-name:analyze --ci --highestUserWastedRatio 0.1
```

So ci will failed when wasted ratio greater than 10%

Bellow is all options of @ebizbase/nx-docker:analyze

| Option                   | Type    | Description                                                                                                                                          | Default  |
| ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `ci`                     | boolean | Skip the interactive TUI and validate against CI rules                                                                                               | `false`  |
| `highestUserWastedRatio` | number  | (only valid with --ci given) highest allowable percentage of bytes wasted (as a ratio between 0-1), otherwise CI validation will fail. (default 0.1) |          |
| `highestUserWastedBytes` | number  | (only valid with --ci given) highest allowable bytes wasted, otherwise CI validation will fail. Set -1 mean disabled                                 |          |
| `lowestEfficiencyRatio`  | number  | (only valid with --ci given) lowest allowable image efficiency (as a ratio between 0-1), otherwise CI validation will fail. (default 0.9)            |          |
| `ignoreError`            | boolean | Ignore image parsing errors and run the analysis anyway                                                                                              | `false`  |
| `source`                 | string  | The container engine to fetch the image from. Allowed values: docker, podman, docker-archive (default docker)                                        | `docker` |
| `image`                  | string  | The image to analyze                                                                                                                                 |          |
| `dockerSocket`           | string  | The docker socket to use for the analysis                                                                                                            |          |
| `version`                | string  | The version of dive to use                                                                                                                           |          |

To check all possible options please check this [schema.json](./src/executors/analyze/schema.json) file

## License

This project is licensed under the MIT License.