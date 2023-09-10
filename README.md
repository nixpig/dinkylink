# dinkylink

## Running locally

1. Clone the repo: `git clone https://github.com/nixpig/dinkylink.git`
1. Change into the directory: `cd dinkylink`
1. Create a `.env` file: documented in the next section (a quick copy-paste will do the trick)
1. Install dependencies and build: `yarn install && yarn build`
1. Build and spin up the containers: `docker compose -f docker-compose.dev.yml up --build`
1. Go to [`https://ui.localhost`](https://ui.localhost) in your browser.

### `.env`

The following environment variables are expected to be provided via a `.env` file. The defaults provided here will work just fine if you're just planning to spin up the apps using the provided `docker-compose.dev.yml`.

```bash
# Proxy
SSL_CERT=ui.localhost+4.pem
SSL_CERT_KEY=ui.localhost+4-key.pem
SSL_CERT_DIRECTORY=/home/nixpig/.ssl

# UI
UI_HOST=ui.localhost
UI_PORT=8080

# Create
CREATE_HOST=create.localhost
CREATE_PORT=8081

# View
VIEW_HOST=view.localhost
VIEW_PORT=8082

# Visit
VISIT_HOST=visit.localhost
VISIT_PORT=8083

# Stats
STATS_HOST=stats.localhost
STATS_PORT=8084

# Database
DB_HOST=db
DB_PORT=27017

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
MONGO_INITDB_DATABASE=dinkylink

MONGO_USERNAME=dinky
MONGO_PASSWORD=example

# Cache
CACHE_HOST=cache
CACHE_PORT=6379
CACHE_USER=redis
CACHE_PASSWORD=example

# Broker
BROKER_HOST=broker
BROKER_PORT=6379
BROKER_USER=redis
BROKER_PASSWORD=example

# Stream
STREAM_HOST=stream
STREAM_PORT=6379
STREAM_USER=redis
STREAM_PASSWORD=example

# Generic args
REDIS_ARGS="--requirepass example --user redis on >password ~* allcommands --user default off nopass nocommands"
```
