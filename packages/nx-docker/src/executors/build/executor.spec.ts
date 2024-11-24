import { ExecutorContext, logger } from '@nx/devkit';
import { execFileSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { DockerUtils } from '@ebizbase/nx-devkit';
import semverParse from 'semver/functions/parse';
import executor from './executor';
import { DockerExecutorSchema } from './schema';

jest.mock('@nx/devkit');
jest.mock('fs');
jest.mock('child_process');
jest.mock('semver/functions/parse');
jest.mock('@ebizbase/nx-devkit', () => {
  return {
    ProjectUtils: jest.requireActual('@ebizbase/nx-devkit').ProjectUtils,
    DockerUtils: jest.fn().mockImplementation(() => ({
      checkDockerInstalled: jest.fn(),
      checkBuildxInstalled: jest.fn(),
    })),
  };
});

const mockDockerUtils = DockerUtils as jest.MockedClass<typeof DockerUtils>;
describe('Docker Executor', () => {
  const mockContext: ExecutorContext = {
    isVerbose: false,
    root: '/workspace',
    projectName: 'test-project',
    cwd: '/workspace',
    projectsConfigurations: {
      version: 2,
      projects: {
        'test-project': {
          root: 'apps/test-project',
          sourceRoot: 'apps/test-project/src',
          projectType: 'application',
          metadata: {
            version: '1.0.0',
          },
          targets: {},
        },
      },
    },
    nxJsonConfiguration: {},
    projectGraph: {
      nodes: {},
      dependencies: {}
    },
  };

  let options: DockerExecutorSchema;


  beforeEach(() => {
    jest.clearAllMocks();
    options = {
      version: '1.0.0',
      namespace: 'test-namespace',
      outputs: ['dist'],
      cacheFrom: ['type=local,src=/path/to/dir'],
      cacheTo: ['type=local,src=/path/to/dir'],
      addHost: ['host:ip'],
      allow: ['network:network'],
      annotation: ['key=value'],
      attest: ['type=local,src=/path/to/dir'],
      args: ['key=value'],
      labels: { key: 'value' },
      metadataFile: 'metadata.json',
      shmSize: '2gb',
      ulimit: ['nofile=1024:1024'],
      target: 'target',
      tags: ['latest', '{major}.{minor}'],
      registries: ['registry.example.com'],
      file: './Dockerfile',
      context: './',
      flatforms: ['linux/amd64', 'linux/arm64'],
    };
    (logger.info as jest.Mock).mockImplementation(() => { });
    (logger.fatal as jest.Mock).mockImplementation(() => { });
    (existsSync as jest.Mock).mockReturnValue(true);
    (semverParse as jest.Mock).mockImplementation(() => ({ major: 1, minor: 0, patch: 0 }));
    (mkdirSync as jest.Mock).mockImplementation(() => { });



  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should validate options and run docker command successfully', async () => {
    mockDockerUtils.mockImplementation(() => ({
      checkDockerInstalled: jest.fn().mockReturnValue(true),
      checkBuildxInstalled: jest.fn().mockReturnValue(true),
    }));

    const result = await executor(options, mockContext);

    expect(execFileSync).toHaveBeenLastCalledWith(
      'docker',
      expect.arrayContaining(['buildx', 'build']),
      { stdio: 'inherit', cwd: '/workspace' }
    );
    expect(result.success).toBe(true);
  });


  it('should failed when docker and buildx installed', async () => {
    mockDockerUtils.mockImplementation(() => ({
      checkDockerInstalled: jest.fn().mockReturnValue(false),
      checkBuildxInstalled: jest.fn().mockReturnValue(false),
    }));

    const result = await executor(options, mockContext);
    expect(result.success).toBe(false);
    expect(logger.fatal).toHaveBeenCalledWith('Docker is not installed or daemon is not running');
  });


  it('should failed when not yet installed buildx', async () => {
    mockDockerUtils.mockImplementation(() => ({
      checkDockerInstalled: jest.fn().mockReturnValue(true),
      checkBuildxInstalled: jest.fn().mockReturnValue(false),
    }));

    const result = await executor(options, mockContext);
    expect(result.success).toBe(false);
    expect(logger.fatal).toHaveBeenCalledWith('Buildx is not installed');
  });


  it('should failed when project metadata and executor options not containt version', async () => {
    mockDockerUtils.mockImplementation(() => ({
      checkDockerInstalled: jest.fn().mockReturnValue(true),
      checkBuildxInstalled: jest.fn().mockReturnValue(true),
    }));
    mockContext.projectsConfigurations.projects['test-project'].metadata = {};
    options.version = undefined;
    const result = await executor(options, mockContext);
    expect(result.success).toBe(false);
    expect(logger.fatal).toHaveBeenCalledWith('No version provided. Specify in options or metadata of project.json');
  });

  it('should failed when project metadata and executor options not containt namespace', async () => {
    mockDockerUtils.mockImplementation(() => ({
      checkDockerInstalled: jest.fn().mockReturnValue(true),
      checkBuildxInstalled: jest.fn().mockReturnValue(true),
    }));
    options.namespace = undefined;
    const result = await executor(options, mockContext);
    expect(result.success).toBe(false);
    expect(logger.fatal).toHaveBeenCalledWith('Namespace is required');
  });



});
