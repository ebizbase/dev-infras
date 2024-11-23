import { execFileSync } from 'child_process';
import { DockerUtils, ProjectUtils } from '@ebizbase/nx-devkit';
import { ExecutorContext } from '@nx/devkit';
import buildExecutor from './executor';
import { BuildExecutorSchema } from './schema';

jest.mock('child_process');
jest.mock('@ebizbase/nx-devkit');
jest.mock('@nx/devkit');

describe('buildExecutor', () => {
  let context: ExecutorContext;
  let dlxCommand: string;

  beforeEach(() => {
    context = {
      root: '/root',
      isVerbose: false,
      projectName: 'test-project',
      targetName: 'build',
      workspace: {
        projects: {
          'test-project': {
            root: 'apps/test-project',
          },
        },
      },
      projectsConfigurations: {
        version: 2,
        projects: {
          'test-project': {
            root: 'apps/test-project',
          },
        },
      },
      nxJsonConfiguration: {},
      cwd: '/root',
      projectGraph: {
        nodes: {},
        dependencies: {},
      },
    } as ExecutorContext;

    dlxCommand = 'npx';
    require('@nx/devkit').getPackageManagerCommand.mockReturnValue({ dlx: dlxCommand });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success false if Docker is not installed', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(false);

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if no version is provided', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    const options: BuildExecutorSchema = {
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
      version: '',
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if invalid version is provided', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    const options: BuildExecutorSchema = {
      version: 'invalid-version',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if no namespace is provided', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    const options: BuildExecutorSchema = {
      version: '1.0.0',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
      namespace: '',
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if devcontainer is not installed', async () => {
    (execFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('devcontainer is not installed');
    });

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if devcontainer build fails', async () => {
    (execFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to build devcontainer');
    });

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if mising version', async () => {
    const options: BuildExecutorSchema = {
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });

  it('should return success false if version is wrong', async () => {
    const options: BuildExecutorSchema = {
      version: 'wrong-version',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);
    expect(result).toEqual({ success: false });
  });


  it('should correctly handle labels', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    jest.spyOn(ProjectUtils.prototype, 'getProjectRoot').mockReturnValue('/root-folder');
    (execFileSync as jest.Mock).mockImplementation(() => { });

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: false,
      registries: [],
      labels: {
        'org.opencontainers.image.source': 'https://github.com/ebizbase/dev-infras',
        'org.opencontainers.image.description': 'Base devcontainer image',
      },
    };

    const result = await buildExecutor(options, context);

    expect(execFileSync).toHaveBeenCalledWith(
      'npx',
      expect.arrayContaining([
        '--label',
        'org.opencontainers.image.source="https://github.com/ebizbase/dev-infras"',
        '--label',
        'org.opencontainers.image.description="Base devcontainer image"',
      ]),
      expect.any(Object)
    );
    expect(result).toEqual({ success: true });
  });

  it('should handle empty tags and labels gracefully', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    jest.spyOn(ProjectUtils.prototype, 'getProjectRoot').mockReturnValue('/root-folder');
    (execFileSync as jest.Mock).mockImplementation(() => { });

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: [],
      push: false,
      registries: [],
      labels: {},
    };

    const result = await buildExecutor(options, context);

    expect(execFileSync).toHaveBeenCalledWith(
      'npx',
      expect.not.arrayContaining(['--image-name']),
      expect.any(Object)
    );
    expect(result).toEqual({ success: true });
  });

  it('should include --push if push is true', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    jest.spyOn(ProjectUtils.prototype, 'getProjectRoot').mockReturnValue('/root-folder');
    (execFileSync as jest.Mock).mockImplementation(() => { });

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: '.',
      tags: ['latest'],
      push: true,
      registries: [],
    };

    const result = await buildExecutor(options, context);

    expect(execFileSync).toHaveBeenCalledWith(
      'npx',
      expect.arrayContaining(['--push']),
      expect.any(Object)
    );
    expect(result).toEqual({ success: true });
  });

  it('should correctly set custom workspace folder', async () => {
    jest.spyOn(DockerUtils.prototype, 'checkDockerInstalled').mockReturnValue(true);
    jest.spyOn(ProjectUtils.prototype, 'getProjectRoot').mockReturnValue('/root-folder');
    (execFileSync as jest.Mock).mockImplementation(() => { });

    const options: BuildExecutorSchema = {
      version: '1.0.0',
      namespace: 'test-namespace',
      workspaceFolder: 'custom-folder',
      tags: ['latest'],
      push: false,
      registries: [],
    };

    const result = await buildExecutor(options, context);

    expect(execFileSync).toHaveBeenCalledWith(
      'npx',
      expect.arrayContaining(['--workspace-folder=/root-folder/custom-folder']),
      expect.any(Object)
    );
    expect(result).toEqual({ success: true });
  });
});
