import { IAccount } from "../auth/models";
import { userCollection } from "../mongo/collections";
import { IUser } from "./models";

export const getUser = async (name: string): Promise<IUser | null> => {
  try {
    const collection = await userCollection();
    const user = await collection.findOne<IUser & IAccount>({ name });
    return user
      ? {
          _id: user._id,
          name: user.name,
          toasts: user.toasts,
          notToasts: user.notToasts,
        }
      : null;
  } catch (error) {
    throw new Error(error);
  }
};
