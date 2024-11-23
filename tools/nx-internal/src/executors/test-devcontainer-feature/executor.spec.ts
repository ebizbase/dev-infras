import { ExecutorContext } from '@nx/devkit';

import { TestDevcontainerFeatureExecutorSchema } from './schema';
import executor from './executor';

const options: TestDevcontainerFeatureExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
  projectGraph: {
    nodes: {},
    dependencies: {},
  },
  projectsConfigurations: {
    projects: {},
    version: 2,
  },
  nxJsonConfiguration: {},
};

describe('TestDevcontainerFeature Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
