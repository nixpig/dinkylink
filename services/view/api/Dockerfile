FROM node:18.0.0
ARG VIEW_API_PORT

WORKDIR /usr/src/app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src src

RUN yarn && yarn build

CMD [ "npx", "nodemon", "lib/index.js" ]

EXPOSE ${VIEW_API_PORT}
