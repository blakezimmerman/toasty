import bcrypt from "bcrypt-nodejs";
import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { SECRET } from "..";
import { createAccount, getAccount } from "./data";
import { IAccount, ILogin } from "./models";

const router = express.Router();

const checkPassword = (hash: string, password: string) =>
  bcrypt.compareSync(password, hash);

const generateToken = (userName: string) => jwt.sign(userName, SECRET);

const generateAccount = async ({ name, password }: ILogin): Promise<IAccount> => {
  let account;

  try {
    account = await getAccount(name);
  } catch (error) {
    throw new Error("A server error occurred");
  }

  if (account) {
    throw new Error("Sorry, this username is already taken");
  }

  return {
    _id: new ObjectId().toHexString(),
    name,
    hashedPassword: bcrypt.hashSync(password),
  };
};

router.post("/login", async (req, res) => {
  let account;

  try {
    account = await getAccount(req.body.name);
  } catch (error) {
    res.status(500).json("A server error occurred");
  }

  if (account && checkPassword(account.hashedPassword, req.body.password)) {
    res.json({
      name: account.name,
      token: generateToken(account.name),
    });
  } else {
    res.status(500).json("Incorrect username or password entered");
  }
});

router.post("/register", async (req, res) => {
  let account;

  try {
    account = await generateAccount(req.body);
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }

  try {
    const writeOp = await createAccount(account);
    if (writeOp.insertedCount > 0) {
      res.json(`Account for ${account.name} created successfully`);
    } else {
      res.status(500).json("Unable to create account, please try again later");
    }
  } catch (error) {
    res.status(500).json("Unable to create account, please try again later");
  }
});

export { router as authRouter };
