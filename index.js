import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/userRouter.js";
import trashRouter from "./routes/trashRouter.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/trash", trashRouter);
const PORT=5000;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log("server started at http://localhost:5000")
    );
  } catch (error) {
    console.log(error.message);
  }
};
startServer();
