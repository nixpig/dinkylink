db = new Mongo().getDB(`${process.env.MONGO_INITDB_DATABASE}`);

console.log(`
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 

  ${process.env.MONGO_INITDB_DATABASE}

  ${process.env.CREATE_DB_USERNAME}

  ${process.env.CREATE_DB_PASSWORD}

  ${process.env.CREATE_DB_COLLECTION_NAME}

  ${process.env.MONGO_INITDB_DATABASE}


### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
`);

db.createUser({
  user: process.env.CREATE_DB_USERNAME,
  pwd: process.env.CREATE_DB_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createCollection(CREATE_DB_COLLECTION_NAME);
db.links.insertOne({ link: "test" });
