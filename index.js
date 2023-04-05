import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import trashRouter from "../mess-server/routes/trashRouter.js";
import userRouter from "../mess-server/routes/userRouter.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

app.use("/api/v1/trash", trashRouter);
app.use("/api/v1/user", userRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5000, () =>
      console.log("server started at http://localhost:5000")
    );
  } catch (error) {
    console.log(error.message);
  }
};
startServer();
