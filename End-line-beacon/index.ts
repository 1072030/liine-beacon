import * as express from "express";
import * as handleEventRouter from "./router/imageUpload";
const app = express();
app.get("/", (req: any, res: any) => {
  console.log("123");
  res.send({
    status: "success",
    message: "Connect",
  });
});

app.listen(3000, () => {
  console.log("listen port 3000");
});
