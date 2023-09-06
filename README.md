# dinkylink

## Running locally

1. Clone the repo: `git clone https://github.com/nixpig/dinkylink.git`
1. Ensure you have a `.env` file, as documented in the next section (a quick copy-paste will do the trick)
1. Spin build and spin up the containers: `docker compose -f docker-compose.dev.yml up --build`
1. Go to [`https://ui.localhost`](https://ui.localhost) in your browser.

### `.env`

The following environment variables are expected to be provided via a `.env` file. The defaults provided here will work just fine if you're just planning to spin up the apps using the provided `docker-compos.dev.yml`.

```bash
MONGO_INITDB_ROOT_USERNAME=root # The username to use for the root admin account in MongoDB.
MONGO_INITDB_ROOT_PASSWORD=example # The password to use for the root admin account in the MongoDB.
MONGO_INITDB_DATABASE=dinkylink # The name of the database to create in MongoDB.
MONGO_USERNAME=dinky # The user-level username (given `readWrite`) privileges on the above created database.
MONGO_PASSWORD=example # The password for the above created user.
DB_HOST=db # The hostname of the database.
DB_PORT=27017 # The port the database is running on.
API_HOST=localhost # The hostname of the API server.
API_PORT=8081 # The port the API server is accessible on.
UI_HOST=ui.localhost # The hostname of the UI server.
UI_PORT=8080 # the port the UI server is accessible on.
```
