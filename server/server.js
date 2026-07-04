import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
