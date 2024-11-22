<!-- trunk-ignore-all(markdownlint/MD041) -->
<img src="docs/assets/logo.png" alt="Ebizbase dev-infras logo" title="Ebizbase dev-infras logo" align="right" width="72" height="72">

# [Ebizbase Development Infrastructure](https://github.com/ebizbase/dev-infras)

<a id="readme-top"></a>

[![Code Quality][codefactor-shield]][codefactor-url]
[![Issues][issues-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

Development infrastructure projects monorepo. This repo containt prebuilt devcontainer images, devcontainer features, nx plugins.

This project is mainly used internally within ebizbase projects but we have decided to share the entire source code of the project for the community to use and contribute.

## List of packages

| Name                                                                | Type                 | Description                                                                                     |
| ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| [omz-plugin][omz-plugin-readme]                                     | devcontainer feature | This feature will install and active plugins for oh my zsh                                      |
| [install-npm-package-globally][install-npm-package-globally-readme] | devcontainer feature | This feature will be install npm packages globally                                              |
| [powerlevel10k][powerlevel10k-readme]                               | devcontainer feature | This feature will install, activate and config powerlevel10k theme for oh my zsh                |
| base-devcontainer                                                   | devcontainer image   | Base on ubuntu image with git,zsh (with modern features)        |
| node-devcontainer                                              | devcontainer image   | Base on base-devcontainer with node, npm, yarn,pnpm, bun                            |
| nx-devcontainer                                              | devcontainer image   | Base on node-devcontainer with nx tools                      | 
| playwright-devcontainer                                             | devcontainer image   | Base on node-devcontainer with playwright install (both os dependecies and browser binary) |
| nx-playwright-devcontainer                                             | devcontainer image   | Base on nx-devcontainer with docker in docker and playwright install (both os dependecies and browser binary) |
| [nx-docker][nx-docker-readme]                                       | nx plugin            | The NX plugin to build, push and analyze image                                                  |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

See [Contribution Guidelines][contribution-guidelines-url] for more information.

### Contributors

<a href="https://github.com/ebizbase/dev-infras/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ebizbase/dev-infras" alt="ebizbase/dev-infras top contributors" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [LICENSE][license-url] for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[codefactor-shield]: https://img.shields.io/codefactor/grade/github/ebizbase/dev-infras
[codefactor-url]: https://www.codefactor.io/repository/github/ebizbase/dev-infras
[contributors-shield]: https://img.shields.io/github/contributors/ebizbase/dev-infras.svg
[contributors-url]: https://github.com/ebizbase/dev-infras/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/ebizbase/dev-infras.svg
[issues-url]: https://github.com/ebizbase/dev-infras/issues
[license-shield]: https://img.shields.io/github/license/ebizbase/dev-infras.svg
[license-url]: https://github.com/ebizbase/dev-infras/blob/main/LICENSE.txt
[contribution-guidelines-url]: https://github.com/ebizbase/dev-infras/blob/main/CONTRIBUTING.md
[omz-plugin-readme]: https://github.com/ebizbase/dev-infras/blob/main/devcontainer-features/omz-plugin/README.md
[install-npm-package-globally-readme]: https://github.com/ebizbase/dev-infras/blob/main/devcontainer-features/install-npm-package-globally/README.md
[powerlevel10k-readme]: https://github.com/ebizbase/dev-infras/blob/main/devcontainer-features/powerlevel10k/README.md
[nx-docker-readme]: https://github.com/ebizbase/dev-infras/blob/main/nx-plugins/nx-docker/README.md
