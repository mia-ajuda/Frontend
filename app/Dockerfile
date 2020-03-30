FROM node:12.16.1-alpine

RUN mkdir /app
WORKDIR /app

RUN apk update && apk upgrade
# apk add git

RUN apk add --no-cache bash

RUN yarn global add expo-cli

ADD package.json package.json

RUN yarn

CMD ["yarn", "start"]

