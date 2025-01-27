FROM node:23-alpine3.20 as build

WORKDIR /app

COPY package.json .

RUN npm install pnpm -g

RUN pnpm install

COPY . .

RUN pnpm build