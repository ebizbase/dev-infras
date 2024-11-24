# omz-plugin devcontainer feature

Oh My Zsh is a delightful, open source, community-driven framework for managing your Zsh configuration. It comes bundled with thousands of helpful functions, helpers, plugins, themes. 

This feature installs and activates plugins for Oh My Zsh. Helps enhance the command line experience and productivity

## Example Usage

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/omz-plugin:1": {
    "preInstalledPlugins": [
      "git", 
      "git-auto-fetch"
    ],
    "customPlugins": [
      "zsh-syntax-highlighting:https://github.com/zsh-users/zsh-syntax-highlighting.git",
      "zsh-autosuggestions:https://github.com/zsh-users/zsh-autosuggestions/archive/refs/tags/v0.7.1.zip"
    ],
    "deleteInactive": false 
  }
}
```

## Options

| Options Id          | Description                                                                                   | Type  | Default |
| ------------------- | --------------------------------------------------------------------------------------------- | ----- | ------- |
| preInstalledPlugins | The list of pre-installed oh-my-zsh plugins to active (e.g. git,git-auto-fetch) (\*)          | array | ["git"] |
| customPlugins       | The list of custom plugins you want to install, using the format `plugin-name:url` (\*\*)     | array | []      |
| deleteInactive      | Should delete inactive plugins or not                                                         | bool  | false   |

**(\*)** See [list of oh-my-zsh preinstalled plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/plugins)

**(\*\*)** We support zip release url or git url. See example [here](https://github.com/ebizbase/dev-infras/blob/main/devcontainer-images/base-devcontainer/devcontainer.json)

## Contributing

We welcome contributions! Fork the repo, create a pull request, or open an issue with the "enhancement" tag. See [Contribution Guidelines][contribution-guidelines-url] for details.

## Issues

If you encounter any issues while using this feature, please check the following before creating a new issue:
- Ensure your JSON configuration is correctly formatted. Refer to the Example Usage section for guidance.
- Verify the plugin URLs are accessible and valid (e.g., Git repository links or release ZIP URLs).

If the issue persists, feel free to:

- Open an issue on the [GitHub issues page][issues-url]
- Provide detailed information, including:
  - A description of the issue.
  - Steps to reproduce the problem.
  - Logs or error messages, if applicable.
  - Your devcontainer setup (e.g., OS, DevContainer version).

Our team will review and address your issue as soon as possible. For faster resolution, ensure your report is clear and well-documented.


## License

Distributed under the MIT License. See [LICENSE][license-url] for more information.

[issues-url]: https://github.com/ebizbase/dev-infras/issues
[contribution-guidelines-url]: https://github.com/ebizbase/dev-infras/blob/main/CONTRIBUTING.md
[license-url]: https://github.com/ebizbase/dev-infras/blob/main/LICENSE.txt

