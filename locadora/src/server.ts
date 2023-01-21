import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express) => {
  return res.json({ message: "hello word" });
});

app.listen(3333, () => console.log("Server is running"));
