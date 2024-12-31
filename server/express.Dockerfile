FROM node:23-alpine3.21

WORKDIR /app

COPY package.json .

RUN npm install pnpm -g

RUN pnpm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["sh", "-c", "pnpm dlx prisma db push && pnpm run dev"]