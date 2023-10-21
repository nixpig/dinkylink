# dinkylink

## Overview

I wanted to have a play around with a couple of features of Redis - caching, pub/sub and streams.

Obviously, this is a pretty convoluted set up for such a simple app, but allowed to touch on the Redis features mentioned.

![dinkylink architecture diagram](dinkylink-architecture.png "dinkylink architecture diagram")

### `.env` example

```shell

# PROXY
SSL_CERT=localhost.pem
SSL_CERT_KEY=localhost-key.pem
SSL_CERT_DIRECTORY=/home/nixpig/.ssl/

# CREATE DB
CREATE_DB_DOCKER_HOST=create_db
CREATE_DB_PUBLIC_HOST=localhost
CREATE_DB_PORT=27017
CREATE_DB_USERNAME=dinky
CREATE_DB_PASSWORD=secret123
CREATE_DB_COLLECTION_NAME=links

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example123
MONGO_INITDB_DATABASE=create_db

# CREATE API
CREATE_API_DOCKER_HOST=create_api
CREATE_API_PUBLIC_HOST=create.localhost
CREATE_API_PORT=8081

# CREATE UI
CREATE_UI_DOCKER_HOST=create_ui
CREATE_UI_PUBLIC_HOST=create.localhost
CREATE_UI_PORT=8082

# VIEW API
VIEW_API_DOCKER_HOST=view_api
VIEW_SOCKET_PUBLIC_HOST=viewsocket.localhost
VIEW_API_PORT=8084

# VIEW UI
VIEW_UI_DOCKER_HOST=view_ui
VIEW_UI_PUBLIC_HOST=view.localhost
VIEW_UI_PORT=8083

# VIEW GO
VIEW_GO_DOCKER_HOST=view_api
VIEW_GO_PUBLIC_HOST=go.localhost
VIEW_GO_PORT=8086

# SHELL UI
SHELL_UI_DOCKER_HOST=shell_ui
SHELL_UI_PUBLIC_HOST=localhost
SHELL_UI_PORT=8085

# BUS
BUS_DOCKER_HOST=bus
BUS_PORT=6379

# CACHE
CACHE_DOCKER_HOST=cache
CACHE_PORT=6379

```
