/** @format */

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://aliefalief2005:zCYSCawEjFNldTCG@aliefaaditya0.vdnnx0x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to database in MongoDB server...");
  } catch (err) {
    console.log(err);
    console.log("Connection to database error. Check error information");
    process.exit();
  }
}
run().catch(console.dir);

module.exports = {
  client,
};
