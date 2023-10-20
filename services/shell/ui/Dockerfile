FROM node:18.0.0-alpine3.14

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node

WORKDIR /usr/src/app

COPY dist dist

CMD [ "npx", "http-server", "-p", "8085", "dist/"]

EXPOSE 8085
