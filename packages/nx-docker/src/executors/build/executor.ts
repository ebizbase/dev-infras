import semverParse from 'semver/functions/parse';
import { logger, PromiseExecutor } from '@nx/devkit';
import { dirname, join } from 'path';
import { DockerExecutorSchema } from './schema';
import { DockerUtils, ProjectUtils } from '@ebizbase/nx-devkit';
import { existsSync, mkdirSync } from 'fs';
import { execFileSync } from 'child_process';
import SemVer from 'semver/classes/semver';

export const paserVersion = (version?: string) => {
  console.log('version', version);
  if (!version) {
    throw new Error('No version provided. Specify in options or metadata of project.json');
  } else {
    const semverVersion = semverParse(version);
    if (semverVersion === null) {
      throw new Error('Error occurred while parsing version');
    } else {
      return semverVersion;
    }
  }
};

// Helper: Chuẩn bị các argument cho lệnh Docker
const prepareDockerArguments = (
  options: DockerExecutorSchema,
  version: SemVer,
  dockerfilePath: string,
  contextPath: string
) => {
  const outputArgs = options.outputs ? [`--output=${options.outputs.join(',')}`] : [];
  const cacheFromArgs = options.cacheFrom?.map((cache) => `--cache-from=${cache}`) || [];
  const cacheToArgs = options.cacheTo?.map((cache) => `--cache-to=${cache}`) || [];
  const platformsArgs = options.flatforms ? [`--platform=${options.flatforms.join(',')}`] : [];
  const metadataFileArgs = options.metadataFile ? ['--metadata-file', options.metadataFile] : [];
  const buildArgs = options.args?.flatMap((arg) => ['--build-arg', arg]) || [];
  const addHostArgs = options.addHost?.flatMap((host) => ['--add-host', host]) || [];
  const allowArgs = options.allow?.flatMap((allow) => ['--allow', allow]) || [];
  const annotationArgs = options.annotation?.flatMap((annotation) => ['--annotation', annotation]) || [];
  const attestArgs = options.attest?.flatMap((attest) => ['--attest', attest]) || [];
  const shmSizeArgs = options.shmSize ? ['--shm-size', options.shmSize] : [];
  const uLimitArgs = options.ulimit ? [`--ulimit=${options.ulimit}`] : [];
  const targetArgs = options.target ? ['--target', options.target] : [];
  const labelsArgs = options.labels
    ? Object.entries(options.labels)
      .map(([key, value]) => ['--label', `${key}=${value}`])
      .flat()
    : [];

  const tagsArgs = (options.tags || []).flatMap((tag) =>
    options.registries?.map((registry) =>
      ['-t', `${registry}/${options.namespace}:${tag.replace(/{major}/g, version.major.toString()).replace(/{minor}/g, version.minor.toString()).replace(/{patch}/g, version.patch.toString())}`]
    )
  ).flat() || [];
  const loadArgs = options.load ? ['--load'] : [];
  const pushArgs = options.push ? ['--push'] : [];

  return [
    ...outputArgs,
    ...cacheFromArgs,
    ...cacheToArgs,
    ...platformsArgs,
    ...metadataFileArgs,
    ...buildArgs,
    ...addHostArgs,
    ...allowArgs,
    ...annotationArgs,
    ...attestArgs,
    ...shmSizeArgs,
    ...uLimitArgs,
    ...tagsArgs,
    ...targetArgs,
    ...labelsArgs,
    ...loadArgs,
    ...pushArgs,
    '-f',
    dockerfilePath,
    contextPath,
  ];
};

const executor: PromiseExecutor<DockerExecutorSchema> = async (options, context) => {
  try {
    const dockerService = new DockerUtils();
    const projectUtils = new ProjectUtils(context);

    // Kiểm tra Docker và buildx
    if (!dockerService.checkDockerInstalled(context.isVerbose)) {
      throw new Error('Docker is not installed or daemon is not running');
    } else if (!dockerService.checkBuildxInstalled(context.isVerbose)) {
      throw new Error('Buildx is not installed');
    }

    // Lấy metadata và merge options
    const metadata = projectUtils.getMetadata();
    options = { ...options, ...metadata };

    const version = paserVersion(options.version);

    if(options.namespace === undefined) {
      throw new Error('Namespace is required');
    }

    const dockerfilePath = options.file || join(projectUtils.getProjectRoot(), 'Dockerfile');
    const contextPath = options.context || '.';

    // Kiểm tra Dockerfile và context
    if (!existsSync(dockerfilePath)) {
      throw new Error(`Dockerfile not found at ${dockerfilePath}`);
    }
    if (!existsSync(contextPath)) {
      throw new Error(`Context path not found at ${contextPath}`);
    }

    // Tạo metadata file nếu cần
    if (options.metadataFile && !existsSync(options.metadataFile)) {
      mkdirSync(dirname(options.metadataFile), { recursive: true });
    }

    const args = prepareDockerArguments(options, version, dockerfilePath, contextPath);
    const command = ['docker', 'buildx', 'build', ...args];

    logger.info(`Executing: ${command.join(' ')}`);
    execFileSync(command[0], command.slice(1), { stdio: 'inherit', cwd: context.root });

    return { success: true };
  } catch (error) {
    logger.fatal(error instanceof Error ? error.message : 'Unknown error occurred');
    return { success: false };
  }
};

export default executor;
