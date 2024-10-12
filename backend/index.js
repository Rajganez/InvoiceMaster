import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/check", (req, res) => {
  try {
    res.status(200).send({ msg: "API is Running...." });
  } catch (error) {
    console.log(error);
  }
});

app.listen(
  5000,
  console.log(`Started at ${new Date()}Server is Running in port : ${5000}`)
);
