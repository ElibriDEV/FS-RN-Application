# FS-RN-Application

## Global .env example for Docker run (in ./ directory)
```
PORT=5000
POSTGRES_HOST=postgres
POSTGRES_USER=postgres
POSTGRES_DB=admin
POSTGRES_PASSWORD=admin
POSTGRES_PORT=5432

FRONTEND_URL=http://localhost:3000/

REACT_APP_BACKEND_URL=backend
```

## .env without Docker

### ./backend/.development.dev or ./backend/.production.env
```
PORT=5000
POSTGRES_HOST=postgres
POSTGRES_USER=postgres
POSTGRES_DB=admin
POSTGRES_PASSWORD=admin
POSTGRES_PORT=5432

FRONTEND_URL=http://localhost:3000/
```

### ./frontend/.env
```
REACT_APP_BACKEND_URL=backend
```

# Run application

### Full run:
```bash
$ docker-compose up
```

## Backend run

### Using docker:
```bash
$ docker-compose -f ./backend/docker-compose.yml up
```

### Without Docker:

#### install dependencies:
```bash
$ npm i --prefix ./backend/
```

#### run database using Docker (or your local):
```bash
$ docker-compose -f ./backend/local.yml up
```

#### dev run:
create ./backend/.development.dev
```bash
$ npm run start:dev
```

#### prod run:
create ./backend/.production.dev
```bash
$ npm run start
```

## React run

### Using docker:
set environment REACT_APP_BACKEND_URL in ./frontend/docker-compose.yml
```bash
$ docker-compose -f ./frontend/local.yml up
```

### Without Docker:

#### create ./frontend/.env

#### install dependencies:
```bash
$ npm i --prefix ./backend/
```

#### run:
```bash
$ npm run start
```
