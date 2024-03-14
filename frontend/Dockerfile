FROM node:20-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i

COPY . .

EXPOSE 3000


ENTRYPOINT ["npm", "run", "start"]