FROM node:23-alpine3.20 as build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install pnpm -g

RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:1.27.3-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]