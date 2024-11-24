export interface BuildExecutorSchema {
  workspaceFolder?: string;
  configFile?: string;
  tags: Array<string>;
  push: boolean;
  registries: Array<string>;
  version?: string;
  namespace: string;
  labels?: { [key: string]: string };
}
