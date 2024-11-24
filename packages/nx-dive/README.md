# nx-dive

[dive](https://github.com/wagoodman/dive) is a tool for exploring a docker image, layer contents, and discovering ways to shrink the size of your Docker/OCI image.

@ebizbase/nx-dive is a nx plugin for [dive](https://github.com/wagoodman/dive) 

## Prerequisites

- Ensure you have Docker installed and running on your machine.
- Ensure you have NX installed in your workspace.

## Installation

To install plugin run the following command:

```bash
npm install -D @ebizbase/nx-dive
yarn add -D @ebizbase/nx-dive
pnpm add -D @ebizbase/nx-dive
bun add -D @ebizbase/nx-dive
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


## Contributing

We welcome contributions! Fork the repo, create a pull request, or open an issue with the "enhancement" tag. See [Contribution Guidelines][contribution-guidelines-url] for details.

## Issues

If you encounter any issues while using this feature, please check the following before creating a new issue:
- Ensure your JSON configuration is correctly formatted. Refer to the Example Usage section for guidance.

If the issue persists, feel free to:

- Open an issue on the [GitHub issues page][issues-url]
- Provide detailed information, including:
  - A description of the issue.
  - Steps to reproduce the problem.
  - Logs or error messages, if applicable.
  - Your devcontainer setup (e.g., OS, DevContainer version).

Our team will review and address your issue as soon as possible. For faster resolution, ensure your report is clear and well-documented.


## License

Distributed under the MIT License. See [LICENSE][license-url] for more information.

[issues-url]: https://github.com/ebizbase/dev-infras/issues
[contribution-guidelines-url]: https://github.com/ebizbase/dev-infras/blob/main/CONTRIBUTING.md
[license-url]: https://github.com/ebizbase/dev-infras/blob/main/LICENSE.txt