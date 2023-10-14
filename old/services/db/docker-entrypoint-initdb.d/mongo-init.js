db = new Mongo().getDB(`${process.env.MONGO_INITDB_DATABASE}`);

db.createUser({
  user: `${process.env.MONGO_USERNAME}`,
  pwd: `${process.env.MONGO_PASSWORD}`,
  roles: [{ role: "readWrite", db: `${process.env.MONGO_INITDB_DATABASE}` }],
});

db.createCollection("links");
db.links.insertOne({ link: "test" });
