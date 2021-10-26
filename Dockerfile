FROM node:14-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm ci

EXPOSE 5001

CMD [ "npm", "run", "start:dev" ]