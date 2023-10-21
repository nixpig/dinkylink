FROM node:18.0.0
ARG CREATE_UI_PORT
ARG CREATE_API_PUBLIC_HOST

ENV CREATE_UI_PORT=$CREATE_UI_PORT
ENV CREATE_API_PUBLIC_HOST=$CREATE_API_PUBLIC_HOST

WORKDIR /usr/src/app

COPY package.json package.json
COPY src src
COPY index.html index.html

RUN echo "CREATE_API_PUBLIC_HOST=$CREATE_API_PUBLIC_HOST" >> .env

RUN yarn && yarn build

CMD [ "sh", "-c", "npx http-server -p ${CREATE_UI_PORT} dist/"]

EXPOSE ${CREATE_UI_PORT}
