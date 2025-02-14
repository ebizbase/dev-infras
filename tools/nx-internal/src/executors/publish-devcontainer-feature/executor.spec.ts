import executor from './executor';
import { ExecutorContext, logger } from '@nx/devkit';
import { execFileSync } from 'child_process';

jest.mock('@nx/devkit', () => ({
  logger: {
    fatal: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('child_process', () => ({
  execFileSync: jest.fn(),
}));

describe('runExecutor', () => {
  const context: ExecutorContext = {
    root: '/workspace-root',
    cwd: '',
    isVerbose: false,
    projectName: 'test-project',
    projectGraph: {
      nodes: {},
      dependencies: {},
    },
    projectsConfigurations: {
      projects: {
        'test-project': {
          root: '/workspace-root/project-root',
          targets: {},
        },
      },
      version: 2,
    },
    nxJsonConfiguration: {},
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should execute the publish command successfully', async () => {
    (execFileSync as jest.Mock).mockImplementation(() => {});

    const result = await executor({}, context);

    expect(result).toEqual({ success: true });
    expect(execFileSync).toHaveBeenCalledWith(
      'npx',
      [
        'devcontainer',
        'features',
        'publish',
        '--registry',
        'ghcr.io',
        '--namespace',
        'ebizbase/devcontainer-features',
        '/workspace-root/project-root/src/test-project',
      ],
      { cwd: '/workspace-root', stdio: 'inherit' }
    );
  });

  it('should log an error and return failure when ProjectUtils throws', async () => {
    const result = await executor({}, { ...context, projectName: undefined });
    expect(result).toEqual({ success: false });
    expect(logger.fatal).toHaveBeenCalledWith('No project name provided', expect.any(Error));
    expect(execFileSync).not.toHaveBeenCalled();
  });

  it('should handle errors from execFileSync gracefully', async () => {
    (execFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('Command failed');
    });

    const result = await executor({}, context);
    expect(result).toEqual({ success: false });
    expect(logger.fatal).toHaveBeenCalledWith(
      'Error while executing the publish command',
      expect.any(Error)
    );
  });
});
