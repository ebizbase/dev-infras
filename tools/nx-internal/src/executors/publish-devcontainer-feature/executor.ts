import { logger, PromiseExecutor } from '@nx/devkit';
import { ProjectUtils } from '@ebizbase/nx-devkit';
import { execFileSync } from 'child_process';
import { PublishDevcontainerFeatureExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<PublishDevcontainerFeatureExecutorSchema> = async (
  _options,
  context
) => {
  let projectUtils;
  try {
    projectUtils = new ProjectUtils(context);
  } catch (error: unknown) {
    logger.fatal('No project name provided', error);
    return { success: false };
  }
  const commands = [
    'npx',
    'devcontainer',
    'features',
    'publish',
    '--registry',
    'ghcr.io',
    '--namespace',
    'ebizbase/devcontainer-features',
    projectUtils.getProjectRoot() + '/src/' + projectUtils.getProjectName(),
  ];

  try {
    execFileSync(commands[0], commands.slice(1), { cwd: context.root, stdio: 'inherit' });
    return { success: true };
  } catch (error) {
    logger.fatal('Error while executing the publish command', error);
    return { success: false };
  }
};

export default runExecutor;
