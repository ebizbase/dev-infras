# node-distroless

This image combines the compactness and security of distroless with the convenience of dumb-init for process management, making Node.js applications run more stably in a container environment.

> This image is maintained with NodeJS latest LTS version

## Usage

To create your own dockerfile, simply copy your distribution folder (often dist/ or build/) to /app into the image.

```dockerfile
FROM ghcr.io/ebizbase/node-distroless
WORKDIR /app
COPY /dist .
CMD [ "index.js" ]
```

Simply run your container as follows:

```shell
docker build -t your-app .
docker run your-app
```



## Contributing

We welcome contributions! Fork the repo, create a pull request, or open an issue with the "enhancement" tag. See [Contribution Guidelines][contribution-guidelines-url] for details.

## Issues

If you encounter any issues while using this feature, please check the following before creating a new issue:
- Ensure your JSON configuration is correctly formatted. Refer to the Example Usage section for guidance.

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