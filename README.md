This project was bootstrapped with [Nest cli](https://docs.nestjs.com/cli/usages#cli-command-reference) and [Create React App](https://github.com/facebook/create-react-app) (/assets).

# DEPENDENCIES
## nestjs
```bash
  npm install
```

## react
```bash
  npm run install-react-dep
```

# DEVELOPMENT

## nestjs http://localhost:33333/
```bash
  npm start 
```

## react - http://localhost:3000/
```bash
  npm run start-react
```

## DB

![Docker >= 17.04 ](https://badgen.net/badge/Docker/>=17.04/409be6?icon=docker)

![docker-compose >=1.8.0 ](https://badgen.net/badge/docker-compose/>=1.8/409be6?icon=docker)

### Setup

Check `.env` file to customize server conf. Feel free to copy .env.dist ;)

```bash
cp .env.dist .env
```

```
docker-compose up -d
```

# PREVIEW

```bash
  npm run build
```
```bash
  npm run build-react
```

all logic is served from **http://localhost:33333/**