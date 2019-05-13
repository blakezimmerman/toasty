import { Db, MongoClient } from "mongodb";

type MongoConnection = Db | undefined;

const serverUrl = process.env.MONGODB_URI || "mongodb://mongo";
const database = process.env.MONGODB_DB || "toasty";

let connection: MongoConnection;

export const connectDb = async () => {
  if (!connection) {
    try {
      const client = await MongoClient.connect(serverUrl, { useNewUrlParser: true });
      connection = client.db(database);
    } catch (error) {
      throw new Error(`Unable to connect to database: ${error}`);
    }
  }
  return connection;
};
