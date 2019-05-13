import { userCollection } from "../mongo/collections";
import { IUser } from "../users/models";
import { IAccount } from "./models";

export const createAccount = async (account: IAccount) => {
  try {
    const collection = await userCollection();
    const user: IUser & IAccount = {
      ...account,
      toasts: 0,
      notToasts: 0,
    };
    return collection.insertOne(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAccount = async (name: string): Promise<IAccount | null> => {
  try {
    const collection = await userCollection();
    const user = await collection.findOne<IUser & IAccount>({ name });
    return user
      ? {
          _id: user._id,
          name: user.name,
          hashedPassword: user.hashedPassword,
        }
      : null;
  } catch (error) {
    throw new Error(error);
  }
};
