"use strict";

const express = require("express");

const handleEvent = require("./handleEvent/handleEvent");
const recreateJson = require("./common/algorithm-bubble");
const { insertMongodb } = require("./config/mongodb-config");
const firebaseinit = require("./config/firebaseinit-config");
const {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");
const multer = require("multer");
const cors = require("cors");

const Dotenv = require("dotenv");
Dotenv.config();
const upload = multer({
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
); //跨域
app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}); //主要line bot callback
app.post("/beacon", (req, res) => {
  //修改mongodb
  const { userId, title, type } = req.body;
  let data;
  data = recreateJson(req.body.contents); //bubble演算法
  try {
    insertMongodb({
      userId: userId,
      type: type,
      title: title,
      contents: data,
    });
  } catch (err) {
    console.log(err);
    res.send("fail to insert mongodb", err).end();
  }
  res.send("successful").end();
});
app.post("/uploadImage", upload.single("image"), async (req, res) => {
  let imageurl = "";
  const Storage = getStorage(firebaseinit);
  const rand =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log(rand);
  const bubbleRef = ref(Storage, `${rand}`);
  const upload = await uploadBytes(bubbleRef, req.file.buffer, {
    contentType: "image/jpeg",
  }).then((snapshot) => {
    console.log("upload successful");
  });
  const geturl = await getDownloadURL(bubbleRef).then((url) => {
    imageurl = url;
    console.log(url);
  });
  res.status(200).send({
    status: "success",
    url: imageurl,
  });
});

app.get("/", (req, res) => {
  res.send("connect successfully").end();
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
