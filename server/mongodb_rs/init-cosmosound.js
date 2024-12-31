db = db.getSiblingDB("cosmosound");
db.createUser({
  user: "root",
  pwd: "root",
  roles: [{ role: "readWrite", db: "cosmosound" }],
});
