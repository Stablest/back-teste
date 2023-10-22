import { IUserInstance } from "./interfaces/user.interface";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { Permission } from "./interfaces/permission.enum";
configDotenv();

const UserSchema = new mongoose.Schema<IUserInstance>({
  name: { type: String, required: [true, "Por favor insira um nome"] },
  cpf: {
    type: String,
    required: [true, "Por favor insira um cpf"],
    unique: true,
  },
  login: {
    type: String,
    required: [true, "Por favor insira um login"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Por favor insira um email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Por favor insira um telefone"],
  },
  postalCode: {
    type: String,
    required: [true, "Por favor insira um CEP"],
  },
  adress: {
    type: String,
    required: [true, "Por favor insira um endereço"],
  },
  adressNumber: {
    type: Number,
    required: [true, "Por favor insira um número"],
  },
  complement: {
    type: String,
    required: [true, "Por favor insira um complemento"],
  },
  neighborhood: {
    type: String,
    required: [true, "Por favor insira um bairro"],
  },
  city: {
    type: String,
    required: [true, "Por favor insira uma cidade"],
  },
  state: {
    type: String,
    required: [true, "Por favor insira um estado"],
  },
  birthDate: {
    type: String,
    required: [true, "Por favor insira uma data de nascimento"],
  },
  password: { type: String, required: [true, "Por favor insira uma senha"] },
  permission: { type: Number, default: Permission.COMMOM },
});

UserSchema.pre("save", async function () {
  const userSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.toString(), userSalt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, permission: this.permission },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};

UserSchema.methods.comparePassword = async function (passwordReceived: string) {
  const isPasswordCorrect = await bcrypt.compare(
    passwordReceived,
    this.password
  );
  return isPasswordCorrect;
};

const userModel = mongoose.model("User", UserSchema);

export { userModel, UserSchema };
