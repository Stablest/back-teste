import { Document } from "mongoose";

export interface IUser {
  name: String;
  login: String;
  cpf: String;
  email: String;
  phone: String;
  postalCode: String;
  adress: String;
  adressNumber: Number;
  complement: String;
  neighborhood: String;
  city: String;
  state: String;
  birthDate: String;
  password: String;
  permission: Number;
}

export interface IUserInstance extends IUser, Document {
  createJWT: () => string;
  comparePassword: (passwordReceived: string) => Promise<boolean>;
}
