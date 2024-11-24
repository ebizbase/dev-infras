# powerlevel10k devcontainer feature

This feature will install, activate and config powerlevel10k theme for oh my zsh

![Screenshot](https://github.com/ebizbase/dev-infras/raw/main/devcontainer-features/powerlevel10k/screenshot.png)

## Example Usage

With default config. The result is like the screenshot above. The default config are pretty minimal. We don’t need to know the current user since it’s already specified in devcontainer.json. But one important thing is that the git branch and state will be set up.

```json
"features": {
    "ghcr.io/ebizbase/devcontainer-features/powerlevel10k:1": {}
}
```

You can define custom config file

```json
"features": {
  "ghcr.io/ebizbase/devcontainer-features/powerlevel10k:1": {
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


## Contributing

We welcome contributions! Fork the repo, create a pull request, or open an issue with the "enhancement" tag. See [Contribution Guidelines][contribution-guidelines-url] for details.

## Issues

If you encounter any issues while using this feature, please check the following before creating a new issue:
- Ensure your JSON configuration is correctly formatted. Refer to the Example Usage section for guidance.
- Verify the config URL are accessible and valid.

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