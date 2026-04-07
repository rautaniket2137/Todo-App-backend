import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import User from "./Routes/User.js"
import Todo from "./Routes/Todo.js"



import { connectDb } from "./config/connectDB.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//middleware

app.use("/api", User);
app.use("/api/todo", Todo);




app.get("/", (req, res) => {
  res.status(201).send("server is running ");
});

const PORT = process.env.PORT || 2001;

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

startServer();
