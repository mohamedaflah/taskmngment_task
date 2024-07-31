import jwt from "jsonwebtoken";
export const decodeToken = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string);
  return payload;
};
