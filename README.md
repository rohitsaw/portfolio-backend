![License](https://img.shields.io/badge/license-MIT-blue)
![Node Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

# Backend for rsaw409

It contains backend code for following projects.
- https://portfolio.rsaw409.me/
- https://play.google.com/store/apps/details?id=developer.rohitsaw.split
- https://tictoe-rsaw409.onrender.com/  






## [![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=rohitsaw_portfolio-backend)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rohitsaw_portfolio-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rohitsaw_portfolio-backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rohitsaw_portfolio-backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rohitsaw_portfolio-backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rohitsaw_portfolio-backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rohitsaw_portfolio-backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rohitsaw_portfolio-backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rohitsaw_portfolio-backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rohitsaw_portfolio-backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rohitsaw_portfolio-backend)


## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## About
Initially each project have their separate backend repository which required separated instance for hosting those. Because these are mainly hobby projects and no significant loads hence it make sense migrate all backend code in single NodeJs Project which can be hosted in free tier of any Paas Provider.
The Goal of this project is to provide backend functionality for all existing or new POC projects with minimum or no effort required to host those.

## Getting Started

### Prerequisites

Make sure you have Node.js, npm/yarn, and any other tools or dependencies that are needed to run node.js project:

```bash
# Ensure you have Node.js installed (version 14 or higher)
node --version

# Also ensure you have npm or yarn
npm --version
```

Make Sure you also have env variables properly set in .env file in root directory.

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/rohitsaw/portfolio-backend.git
cd portfolio-backend

# Install dependencies
npm install
# or if using yarn
yarn install
```

## Usage

how to run it locally:

```bash
# Build the project 
npm run build

# Start the development server
npm run dev
```

how to run it in production:

```bash
# Build the project for production
npm run build

# Run the project
npm start
```

## Testing

To run jest unit test with coverage reports.

```bash
# Run all tests with coverage
npm run test

```

## Environment Variables

Example of what environment variables could be needed depending on specific project:

```text
Each of micro-backend application require some env variables like
postgresConnStr=postgres://user:password@localhost:5432/database
ONESIGNAL_KEY=your_api_key_here
GOOGLE_CLIENT_ID = your_client_id
GOOGLE_CLIENT_SECRET = your_client_secret

```

## Folder Structure

```bash
├── src/                 
│   ├── projectA/   
│   ├── projectB/   
│   ├── projectC/     
│   ├── types/          ## Custom TypeScript types for each project
│       ├── projectA.d.ts 
│       ├── projectB.d.ts
│       └── projectC.d.ts
│   ├── index.ts/        # Main entry point
│    └──  postgres.ts/   # Main DB connection for all projects
├── dist/                # Compiled files (ignored in git)
├── .prettierrc           # prettierrc configuration for code formatting
├── eslint.config.js     # eslint configuration for code linting
├── jest.config.js       # Jest configuration for unit tests
├── package.json         # Project metadata and scripts
├── README.md            # Project documentation
└── tsconfig.json        # typescript configuration
```

## Contributing

If you accept contributions, explain how people can contribute to your project. For example:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
