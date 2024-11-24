export interface DockerExecutorSchema {
  file?: string;
  context?: string;
  args?: Array<string>;
  outputs: Array<string>;
  tags: Array<string>;
  addHost?: string[];
  allow?: string[];
  annotation?: string[];
  attest?: string[];
  cacheFrom?: string[];
  cacheTo?: string[];
  shmSize?: string;
  target?: string;
  ulimit?: string[];
  metadataFile?: string;
  flatforms: string[];
  labels?: { [key: string]: string };
  registries: Array<string>;
  version?: string;
  namespace?: string;
  load: boolean;
  push: boolean;
}
