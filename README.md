# Work-Ad-Hoc

Work-Ad-Hoc is a platform where employers can post their available jobs. This project is designed using microservices architecture, Domain-Driven Design (DDD), and Test-Driven Development (TDD). It is implemented in Go.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [Directory Structure](#directory-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Employers can post job listings.
- Microservices architecture.
- Domain-Driven Design (DDD).
- Test-Driven Development (TDD).

## Architecture

The project is divided into several microservices:

- **Job Service**: Manages job postings.
- **User Service**: Manages employers and users (planned for future development).
- **Notification Service**: Handles notifications to users (planned for future development).
- **Auth Service**: Manages authentication and authorization (planned for future development).

## Getting Started

### Prerequisites

- [Go](https://golang.org/dl/) 1.17 or higher
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

## Directory Structure

```plaintext
work-adhoc/
├── main.go
├── domain/
│   ├── job.go
│   ├── job_repository.go
│   └── job_service.go
├── application/
│   ├── job_command.go
│   ├── job_query.go
│   └── job_handler.go
├── infrastructure/
│   └── persistence/
│       └── job_repository_db.go
└── interfaces/
|   └── api/
|       └── job_controller.go
├── Dockerfile
├── docker-compose.yml
├── go.mod
├── go.sum
├── README.md
└── .gitignore
```

## API Endpoints

Job Service

```http
  POST /jobs: Create a new job.
  GET /jobs: Retrieve all jobs.
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
