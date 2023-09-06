ARG USER_ID
ARG GROUP_ID

FROM node:18.0.0-alpine3.14

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

CMD [ "npx", "nodemon", "lib/index.js" ]

EXPOSE 8081
