# nx-devkit

It contains many utility functions for interactive with nx workspace and projects


## Installation

To install the package, run:

```bash
npm install @ebizbase/nx-devkit
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
