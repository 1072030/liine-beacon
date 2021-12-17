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
const { async } = require("@firebase/util");
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
app.post("/beacon", async (req, res) => {
  //修改mongodb
  const { type, userId, title, hwid } = req.body;
  console.log("title");
  switch (type) {
    case "flex":
      let data;
      data = recreateJson(req.body.contents); //bubble演算法
      try {
        await insertMongodb({
          userId: userId,
          hwid: hwid,
          type: type,
          title: title,
          contents: data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("fail to insert mongodb", err);
      }
      break;
    case "image":
      break;
    case "imageCarousel":
      break;
    case "text":
      break;
  }
  return res.status(200).send({
    status: "successful",
    data: data,
  });
});
app.post("/uploadImage", upload.single("image"), async (req, res) => {
  let imageurl = "";
  const Storage = getStorage(firebaseinit);
  const rand =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log(rand);
  const bubbleRef = ref(Storage, `image/${rand}`);
  const upload = await uploadBytes(bubbleRef, req.file.buffer, {
    contentType: "image/jpeg",
  }).then((snapshot) => {
    console.log("upload successful");
  });
  const geturl = await getDownloadURL(bubbleRef).then((url) => {
    imageurl = url;
    console.log(url);
  });
  console.log(geturl);
  res.status(200).send({
    status: "success",
    data: {
      url: imageurl,
    },
  });
});

app.get("/", (req, res) => {
  res.status(200).send("connect successfully");
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
