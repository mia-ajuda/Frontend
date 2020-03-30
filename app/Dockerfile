FROM node:12.2.0-alpine

RUN mkdir /app
WORKDIR /app

RUN apk update && apk upgrade
# apk add git

RUN apk add --no-cache bash
RUN npm install -g yarn

RUN yarn global add expo-cli

ADD package.json package.json

RUN yarn

CMD ["yarn", "start"]

