import { DockerUtils, ProjectUtils } from '@ebizbase/nx-devkit';
import { getPackageManagerCommand, logger, PromiseExecutor } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
import { execFileSync } from 'child_process';
import semverParse from 'semver/functions/parse';
import semverValid from 'semver/functions/valid';
import { join } from 'path';

const buildExecutor: PromiseExecutor<BuildExecutorSchema> = async (options, context) => {
  const dockerService = new DockerUtils();

  if (!dockerService.checkDockerInstalled(context.isVerbose)) {
    logger.error('Docker is not installed or docker daemon is not running');
    return { success: false };
  }

  let projectUtils;
  try {
    projectUtils = new ProjectUtils(context);
  } catch (error: unknown) {
    logger.fatal('No project name provided', error);
    return { success: false };
  }

  const metadata = projectUtils.getMetadata();
  if (metadata) {
    options = { ...options, ...metadata };
  }

  if (!options.version) {
    logger.fatal(
      'No version provided. You must specify a version in executor options or in metadata of project.json'
    );
    return { success: false };
  } else if (!semverValid(options.version)) {
    logger.fatal('Invalid version provided');
    return { success: false };
  } else if (!options.namespace) {
    logger.fatal(
      'No namespace provided. You must specify a namespace in executor options or in metadata of project.json'
    );
    return { success: false };
  }

  const version = semverParse(options.version);
  if (version === null) {
    logger.fatal('Error occurred while parsing version');
    return { success: false };
  }

  const dlxCommand = getPackageManagerCommand().dlx;
  try {
    execFileSync(dlxCommand, ['devcontainer', '--version'], {
      stdio: context.isVerbose ? 'inherit' : 'ignore',
    });
  } catch (e) {
    logger.fatal('devcontainer is not installed', e);
    return { success: false };
  }

  const workspaceFolderArgs = [
    `--workspace-folder=${join(projectUtils.getProjectRoot(), options.workspaceFolder ?? '.')}`,
  ];
  options.tags = (options.tags ?? []).map((tag) =>
    tag
      .replace(/{major}/g, version.major.toString())
      .replace(/{minor}/g, version.minor.toString())
      .replace(/{patch}/g, version.patch.toString())
  );
  const tagsArgs = options.tags
    .map((tag) => options.registries.map((registry) => `${registry}/${options.namespace}:${tag}`))
    .flat()
    .map((tag) => ['--image-name', tag])
    .flat();
  const labelsArgs = options.labels
    ? Object.entries(options.labels)
      .map(([key, value]) => ['--label', `${key}="${value}"`])
      .flat()
    : [];
  const pushArgs = options.push ? ['--push'] : [];

  try {
    const command = [
      dlxCommand,
      'devcontainer',
      'build',
      ...workspaceFolderArgs,
      ...tagsArgs,
      ...pushArgs,
      ...labelsArgs,
    ];
    logger.info(`${command.join(' ')}\n`);
    execFileSync(command[0], command.slice(1), { stdio: 'inherit', cwd: context.root });
    return { success: true };
  } catch (err) {
    logger.fatal('Failed to build devcontainer', err);
    return { success: false };
  }
};

export default buildExecutor;
