FROM node:12.16.1-alpine

RUN mkdir /app
WORKDIR /app

RUN apk update && apk upgrade
# apk add git

RUN apk add --no-cache bash

RUN npm install expo-cli --global

ADD package.json package.json

RUN npm install

CMD ["npm", "start"]

