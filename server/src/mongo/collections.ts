import { connectDb } from "./connection";

const COLLECTIONS = ["user", "post", "comment"];

const getCollection = (name: string) => async () => {
  try {
    const db = await connectDb();
    return db.collection(name);
  } catch (error) {
    throw new Error(error);
  }
};

if (process.env.CLEAN) {
  COLLECTIONS.forEach(async (name) => {
    try {
      const db = await connectDb();
      db.collection(name).remove({});
    } catch (error) {
      throw new Error(error);
    }
  });
}

export const userCollection = getCollection(COLLECTIONS[0]);
export const postCollection = getCollection(COLLECTIONS[1]);
export const commentCollection = getCollection(COLLECTIONS[2]);
