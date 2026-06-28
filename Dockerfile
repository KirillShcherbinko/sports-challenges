FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

ARG DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres
ENV DATABASE_URL=$DATABASE_URL

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

COPY . .

EXPOSE ${PORT}

CMD ["sh", "-c", "npx prisma generate && npm run dev"]
