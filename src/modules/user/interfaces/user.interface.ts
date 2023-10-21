import { Document } from "mongoose";

export interface IUser {
  name: String;
  cpf: Number;
  email: String;
  phone: Number;
  postalCode: Number;
  adress: String;
  adressNumber: Number;
  complement: String;
  neighborhood: String;
  city: String;
  state: String;
  birthDate: Date;
  password: String;
  permission: Number;
}

export interface IUserInstance extends IUser, Document {
  createJWT: () => string;
  comparePassword: (passwordReceived: string) => Promise<boolean>;
}
