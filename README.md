# Work-AdHoc

Work-AdHoc is a platform where employers can post their available jobs. The idea overtime is to use microservices, Domain-Driven Design (DDD), and Test-Driven Development (TDD). It is implemented in Go.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Use PostgreSQL open source database
- Employers can post job listings.
- Microservices architecture.
- Domain-Driven Design (DDD).
- Test-Driven Development (TDD).

## Getting Started

### Prerequisites

- [Go](https://golang.org/dl/) 1.22.5 or higher
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

   ```bash
   git clone
   cd work-adhoc
   ```

2. Initialize and download Go modules:
   ```bash
   go mod tidy
   ```

### Environment Variables

1. Create a file named .env within server folder

2. Add the following environment variables to the file:

```bash
  DB_HOST=<Database host>
  DB_PORT=<Database port>
  DB_USER=<Database username>
  DB_PASS=<Database password>
  DB_NAME=<Database name>
  DB_SSL_MODE=<Database SSL mode>
```

### Running the Application

1. Start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. The Job Service will be available at `http://localhost:8080`.

### Running Tests

1. Run the tests using the Go test tool:
   ```bash
   go test ./...
   ```

## API Endpoints

Job Service

```
  |--> /api
  |------>/job
  |----------> POST : Create a job
  |----------> DELETE : Remove a job
  |----------> GET : Retrieve all jobs
  |----------> GET:ID : Get job by its ID
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch: git checkout -b feature-branch-name
3. Make your changes and commit them: git commit -m 'Add some feature'
4. Push to the branch: git push origin feature-branch-name
5. Create a pull request.

## License

This project is licensed under the MIT License
