import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
export async function createUser(user: {
  name: string;
  email: string;
  password: string;
}) {
  const userStatus = await userModel.findOne({ email: user.email });
  if (userStatus) {
    throw new Error("user already exist");
  }
  user.password = bcrypt.hashSync(user.password, 10);
  const newUser = new userModel(user);
  await newUser.save();
  return newUser;
}
