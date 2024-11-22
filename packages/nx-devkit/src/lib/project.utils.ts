import { ExecutorContext, ProjectConfiguration } from '@nx/devkit';

export class ProjectUtils {
  private readonly projectName: string;

  constructor(private readonly context: ExecutorContext) {
    const projectName = context.projectName;
    if (!projectName) {
      throw new Error('No project name provided');
    }
    this.projectName = projectName;
  }

  public getProjectName(): string {
    return this.projectName;
  }

  public getProjectConfig(): ProjectConfiguration {
    return this.context.projectsConfigurations.projects[this.projectName];
  }

  public getProjectRoot(): string {
    return this.getProjectConfig().root;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getMetadata(): { [key: string]: any } | undefined {
    return this.getProjectConfig().metadata;
  }
}
