# FS-RN-Application

### .env
```
REACT_APP_BACKEND_URL=backend_url
```

# Run application


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
