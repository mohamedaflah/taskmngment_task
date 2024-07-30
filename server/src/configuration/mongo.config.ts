import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "taskmgnment" })
  .then(() => console.log(`Db connected`))
  .catch((er) => console.log(`db connection error ${er}`));
