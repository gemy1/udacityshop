## Getting Started

These instructions will help you to run the project on your local machine for development and testing
purposes.

### Prerequisites

1. [node](https://nodejs.org/en/) 👉👉 `To Run The Application.`
2. install postgresql on your machine.
3. use Postman to test endpoint

### Environment Setup

**`.env` Structure**

```bash
# DB Configuration
POSTGRES_HOST=127.0.0.1
POSTGRES_DB="DATABASE_NAME for Dev"
POSTGRES_DB_TEST="DATABASE_NAME for Test"
POSTGRES_USER="DATABASE USERNAME"
POSTGRES_PASSWORD="DATABASE PASSWORD"
ENV=dev
# JWT Configuration
JWT_SECRET="YOUR SECRET PASSWORD FOR TOKEN"

```

### Project Setup

**Install Dependencies**

```bash
npm install
```

**Create the Database, if not already created**

```postgresql
CREATE DATABASE shop; -- For Development purposes
CREATE DATABASE test; -- For Testing purposes
```

**Run database Migrations**

```bash
npm run migrate:up
```

### Running the App

**Run the Application on development mode** 👉👉 App will run on [http://localhost:3000](http://localhost:3000)

```bash
npm run watch
```

**Build the Application for production and start it**

```bash
npm run start
```

## Project Scripts

### Compiles for production

```bash
npm run tsc
```

### Start the server after build `production`

```bash
npm start
```

### Run the unit tests

Note: i am working on windows if you are working on mac or linux you should replace
"test": "ENV=test npx tsc && db-migrate --env test up && npx jasmine && db-migrate db:drop test"
in package.json

also to pass all tests you need to go to file "serversSpec.ts" and replace the const token by vaild token

```bash
npm run test
```

### Run the database migrations

```bash
npm run migrate:up    # Create the database schema
npm run migrate:down  # Drop the database tables
```

## Endpoints

See REQUIREMENTS.md

## Database Schema

See REQUIREMENTS.md
