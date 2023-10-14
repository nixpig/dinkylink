FROM node:18.0.0-alpine3.14

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node

WORKDIR /usr/src/app

COPY package.json package.json
COPY lib lib

RUN yarn install

CMD [ "npx", "nodemon", "lib/index.js" ]

EXPOSE 8084
