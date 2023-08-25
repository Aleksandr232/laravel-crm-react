# Базовый образ с Node.js и npm
FROM node:alpine

WORKDIR /app/frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start