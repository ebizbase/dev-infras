const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node get-version.js <path>');
  process.exit(1);
}

const targetPath = process.argv[2];
const manifest = path.join(__dirname, '../release-manifest.json');

fs.readFile(manifest, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file from disk: ${err}`);
    process.exit(1);
  }
  try {
    const manifest = JSON.parse(data);
    if (manifest[targetPath]) {
      const version = {
        major: manifest[targetPath].split('.')[0],
        minor: manifest[targetPath].split('.')[1],
        patch: manifest[targetPath].split('.')[2],
      };
      console.log(JSON.stringify(version));
    } else {
      console.error('Version not found in manifest file');
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error parsing JSON string: ${err}`);
    process.exit(1);
  }
});
