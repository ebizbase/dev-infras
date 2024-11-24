# omz-plugin devcontainer feature

This feature will install and active plugins for oh my zsh

## Example Usage

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/omz-plugin:1": {
    "preInstalledPlugins": ["git", "git-auto-fetch"],
    "customPlugins": [
      "zsh-syntax-highlighting:https://github.com/zsh-users/zsh-syntax-highlighting.git",
      "zsh-autosuggestions:https://github.com/zsh-users/zsh-autosuggestions/archive/refs/tags/v0.7.1.zip"
    ],
    "deleteInactive": false, 
  }
}
```

## Options

| Options Id          | Description                                                                                   | Type  | Default |
| ------------------- | --------------------------------------------------------------------------------------------- | ----- | ------- |
| preInstalledPlugins | The list of pre-installed oh-my-zsh plugins to active (e.g. git,git-auto-fetch) (\*)          | array | ["git"] |
| customPlugins       | The list of custom plugin you want to install with plugin-name1:url1,plugin-name2:url1 (\*\*) | array | []      |
| deleteInactive      | Should delete inactive plugins or not                                                         | bool  | false   |

**(\*)** See [list of oh-my-zsh preinstalled plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/plugins)

**(\*\*)** We support zip release url or git url. See example [here](https://github.com/ebizbase/dev-infras/blob/main/devcontainer-images/base-devcontainer/devcontainer.json)
