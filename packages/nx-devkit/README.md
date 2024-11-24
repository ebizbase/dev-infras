# nx-devkit

It contains many utility functions for interactive with nx workspace and projects

## Installation

To install the package, run:

```bash
npm install -D @ebizbase/nx-devkit
yarn add -D @ebizbase/nx-devkit
pnpm add -D @ebizbase/nx-devkit
bun add -D @ebizbase/nx-devkit
```

## Usage

Here is an example of how to use the `DockerUtils`:

```typescript
import { DockerUtils } from '@ebizbase/nx-devkit';

const dockerService = new DockerUtils();

// Check docker installed and docker daemon is running
if (!dockerService.checkDockerInstalled(context.isVerbose)) {
  logger.error('Docker is not installed or docker daemon is not running');
  return { success: false };
}

// Determine using build or buildx for building Docker image
const isBuildxInstalled = dockerService.checkBuildxInstalled(context.isVerbose);
if (!isBuildxInstalled) {
  logger.warn(
    'Buildx is not installed falling back to docker build. Docker buildx is not installed so performance may be degraded'
  );
}
const buildCommand = isBuildxInstalled ? ['docker', 'buildx', 'build'] : ['docker', 'build'];
```


Here is an example of how to use the `DockerUtils`:

```typescript
import { ProjectUtils } from '@ebizbase/nx-devkit';
const executor: PromiseExecutor<DockerExecutorSchema> = async (options, context) => {
  const projectUtils = new ProjectUtils(context);
  const projectRoot: projectUtils.getProjectRoot();
  const projectName: projectUtils.getProjectName();
};
```

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