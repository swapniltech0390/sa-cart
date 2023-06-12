import { HydratedDocument, Model, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../config/connect";
import {configuration} from '../config/configuration';
const salt = 10;

export interface IUser {
  _id?:any,
  firstname: string,
  lastname: string,
  role: string,
  email:string,
  password: string,
  password2: string,
  token: string,
}
// Add methods to be added
interface IUserMethods {
  comparePassword(password:string): Promise<boolean>;
  generateToken();
}
//Add static methods to model
interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByToken(token: string): Promise<HydratedDocument<IUser, IUserMethods>>;
  deleteToken(): Promise<HydratedDocument<IUser, IUserMethods>>
}

const schema = new Schema<IUser, UserModel, IUserMethods>({
  firstname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  role: {
    type: String,
    required: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  password2: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});


schema.method('comparePassword', async function comparePassword(password): Promise<boolean> {
  let isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
});

schema.method('generateToken', async function generateToken(){
  const user = this;
  const token = jwt.sign(user._id.toHexString(), configuration.SECRET);

  user.token = token;
  await user.save();
});

schema.static('deleteToken', async function deleteToken() {
  await this.updateOne({ $unset: { token: 1 } });
});

schema.static('findByToken', async function findByToken(token: string) {
  if(!token) return false;
 const decode = jwt.verify(token, configuration.SECRET);
 return await this.findOne({ _id: decode, token: token })
});


schema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        user.password2 = hash;
        next();
      });
    });
  } else {
    next();
  }
});

db.model('user',schema);
const User = model<IUser, UserModel>('User', schema);

export default User;