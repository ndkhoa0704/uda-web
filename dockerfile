FROM node:23-bookworm-slim
LABEL authors="ndkhoa"

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY src ./src
COPY index.js ./index.js

ENTRYPOINT ["node", "index.js"]