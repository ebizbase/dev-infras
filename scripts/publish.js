const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getArguments() {
  if (process.argv.length < 4) {
    console.error('Usage: node get-version.js <path> <name> <with-latest-tag>');
    process.exit(1);
  }
  const path = process.argv[2];
  if (!fs.existsSync(path)) {
    console.error(`Project with path ${path} does not exist`);
    process.exit(1);
  } else if (!fs.statSync(path).isDirectory()) {
    console.error(`Path ${path} is not a directory`);
    process.exit(1);
  }
  const name = process.argv[3];
  const latest = process.argv[4] === 'true';
  return { project: path, name, latest };
}

function getVersion(project) {
  const manifest = path.join(__dirname, '../release-manifest.json');

  if (!fs.existsSync(manifest)) {
    console.error(`Error reading manifest file: ${err}`);
    process.exit(1);
  }

  if (!fs.statSync(manifest).isFile()) {
    console.error(`Manifest file is not a file: ${err}`);
    process.exit(1);
  }

  let version;

  try {
    version = JSON.parse(fs.readFileSync(path.join(__dirname, '../release-manifest.json'), 'utf8'));
  } catch (err) {
    console.error(`Error parsing JSON string from manifest file: ${err}`);
    process.exit(1);
  }

  if (!version[project]) {
    console.error('Project version not found in manifest file');
    process.exit(1);
  }

  return {
    major: version[project].split('.')[0],
    minor: version[project].split('.')[1],
    patch: version[project].split('.')[2],
  };
}

function getLabels(project) {
  if (!fs.existsSync(path.join(project, 'project.json'))) {
    console.error(`Project file not found in ${project}`);
    process.exit(1);
  } else if (!fs.statSync(path.join(project, 'project.json')).isFile()) {
    console.error(`Project file is not a file in ${project}`);
    process.exit(1);
  }
  let labels;
  try {
    labels = JSON.parse(fs.readFileSync(path.join(project, 'project.json'), 'utf8'));
  } catch (err) {
    console.error(`Error parsing JSON string from project.json file: ${err}`);
    process.exit(1);
  }

  labels = {
    'org.opencontainers.image.source': 'https://github.com/ebizbase/dev-infras.git',
    'org.opencontainers.image.licenses': 'MIT',
    ...labels,
  };
  return Object.keys(labels).map((key) => `${key}=${labels[key]}`);
}

function getTags(registries, name, version, latest) {
  const tags = [];
  registries.forEach((registry) => {
    if (latest) {
      tags.push(`${registry}/${name.replace(/{version}/g, 'latest')}`);
    }
    tags.push(`${registry}/${name.replace(/{version}/g, version.major)}`);
    tags.push(`${registry}/${name.replace(/{version}/g, version.major)}.${version.minor}`);
    tags.push(
      `${registry}/${name.replace(/{version}/g, version.major)}.${version.minor}.${version.patch}`
    );
  });
  return tags;
}

const { project, name, latest } = getArguments();
const version = getVersion(project);
const registries = ['ghcr.io', 'docker.io'];
const tags = getTags(registries, name, version, latest);
const labels = getLabels(project);
console.log(`\nTags: ${tags.join(', ')}`);
console.log(`Labels: ${labels.join(', ')}\n`);

execFileSync(
  'devcontainer',
  [
    'build',
    '--push',
    '--experimental-lockfile',
    '--workspace-folder',
    project,
    ...tags.map((tag) => `--image-name=${tag}`),
    ...labels.map((label) => `--label=${label}`),
  ],
  { stdio: 'inherit' }
);
