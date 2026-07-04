import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import apiRoute from "./routes/apiRoute.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/data", apiRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
