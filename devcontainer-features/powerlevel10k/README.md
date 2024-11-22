# powerlevel10k devcontainer feature

This feature will install, activate and config powerlevel10k theme for oh my zsh

![Screenshot](https://github.com/ebizbase/dev-infras/raw/main/devcontainer-features/powerlevel10k/screenshot.png)

## Example Usage

With default config. The result is like the screenshot above. The default config are pretty minimal. We don’t need to know the current user since it’s already specified in devcontainer.json. But one important thing is that the git branch and state will be set up.

```json
"features": {
    "ghcr.io/ebizbase/devcontainer-features/powerlevel10k:0": {}
}
```

You can define custom config file

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/powerlevel10k:0": {
    "config": "https://github.com/romkatv/powerlevel10k/blob/master/config/p10k-lean-8colors.zsh"
  }
}
```

## Options

| Options Id               | Description                               | Type    | Default                                                                                                            |
| ------------------------ | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| config                   | Powerlevel10k configuration file url      | string  | https://raw.githubusercontent.com/ebizbase/dev-infras/refs/heads/main/devcontainer-features/powerlevel10k/p10k.zsh |
| version                  | Powerlevel10k version                     | string  | "latest"                                                                                                           |
| deletePreinstalledThemes | Should delete pre installed themes or not | boolean | false                                                                                                              |
