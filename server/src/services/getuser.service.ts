import userModel from "../models/user.model";

export async function getUser(id: string) {
  const user = await userModel.findOne({ _id: id });
  return user;
}
