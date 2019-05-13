export interface ILogin {
  name: string;
  password: string;
}

export interface IAccount {
  _id: string;
  name: string;
  hashedPassword: string;
}
