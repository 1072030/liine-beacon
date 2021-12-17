var express = require("express");
var router = express.Router();

const recreateJson = require("../common/algorithm-bubble");
const { insertMongodb } = require("../config/mongodb-config");
const firebaseinit = require("../config/firebaseinit-config");
const {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");
const multer = require("multer");
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

router.post("/beacon", async (req, res) => {
  //資料丟上mongodb
  let data;
  const { type, userId, title, hwid } = req.body;
  switch (type) {
    case "flex":
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

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  //圖片上傳
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
    console.log("snapshot", snapshot.val());
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
module.exports = router;
