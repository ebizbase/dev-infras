# mongodev

mongodev is a Docker image designed to create a MongoDB environment with a replica set mode using only a single node, allowing you to quickly set up development infrastructure. This image include UI manager tool (mongo-express) too.

> This image is maintained with node latest stable mongo and mongo-express

## Usage

```yaml
services:
  your-service:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: your-service
      MONGO_CONNECTION_STRING: mongodb://mongodev:27017/?directConnection=true&tls=false
    command: ${your app run command}
    depends_on:
      - mongodev
  mongodev:
    image: mongodev:latest
    container_name: mongodev
    ports:
      - "8081:8081"      
```

Simply run your containers as follows:

```shell
docker compose up -d
```

Now you can visit http://localhost:8081/ in your browser to access mongo-express



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