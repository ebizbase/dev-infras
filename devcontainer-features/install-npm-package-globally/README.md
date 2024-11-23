# install-npm-package-globally devcontainer feature

This feature will be install npm packages globally

## Example Usage

Install latest version

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/install-npm-package-globally:1": {
    "packages": ["ts-node"]
  }
}
```

Install specific version

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/install-npm-package-globally:1": {
    "packages": ["ts-node@10.9.2"]
  }
}
```

Install semver version

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/install-npm-package-globally:1": {
    "packages": ["ts-node@~10.9.2"]
  }
}
```

## Options

| Options Id | Description                                                                                                                     | Type  | Default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- |
| packages   | List of npm packages to install globally sparate by comma. We accept specific version with semver (eg 'typescript,nx@^20.0.12') | array | []      |
