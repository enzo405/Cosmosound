FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# ---

FROM node:20-slim

RUN apt-get update -y && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev
RUN npx prisma generate

EXPOSE 4000
CMD ["node", "dist/app.js"]