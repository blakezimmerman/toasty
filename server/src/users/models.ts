import { Request } from "express"

export interface IUser {
  _id: string;
  name: string;
  toasts: number;
  notToasts: number;
}

export interface IUserRequest extends Request {
  user: IUser
}
