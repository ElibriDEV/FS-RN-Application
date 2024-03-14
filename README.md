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

## .env without global Docker run

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
create ./backend/.development.dev
```bash
$ docker-compose -f ./backend/docker-compose.yml up
```

### Without Docker:

#### install dependencies:
```bash
$ npm i --prefix ./backend/ package.json
```

#### run database using Docker (or your local):
```bash
$ docker-compose -f ./backend/local.yml up
```

#### dev run:
create ./backend/.development.dev
```bash
$ npm --prefix ./backend run start:dev
```

#### prod run:
create ./backend/.production.dev
```bash
$ npm --prefix ./backend run start
```

## React run

### Using docker:
set environment REACT_APP_BACKEND_URL in ./frontend/docker-compose.yml
```bash
$ docker-compose -f ./frontend/docker-compose.yml up
```

### Without Docker:

#### create ./frontend/.env

#### install dependencies:
```bash
$ npm i --prefix ./frontend/ package.json
```

#### run:
```bash
$ npm --prefix ./frontend run start
```
