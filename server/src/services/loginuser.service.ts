import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
export async function loginUserService(userData: {
  email: string;
  password: string;
}) {
  const userExist = await userModel.findOne({ email: userData.email });
  if (!userExist) throw new Error("user not found");
  const passCompare = bcrypt.compareSync(userData.password, userExist.password);
  if (!passCompare) throw new Error("user not found🥴");
  return userExist;
}
