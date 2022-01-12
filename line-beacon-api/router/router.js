var express = require("express");
var router = express.Router();
const recreateJson = require("../common/algorithm-bubble");
const { mongoClient } = require("../config/mongodb-config");
const { insertMongodb } = require("../common/mongodb-service");
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
  const { type, userId, title, hwid, date } = req.body;
  switch (type) {
    case "flex":
      data = recreateJson(req.body.contents); //bubble演算法
      try {
        await insertMongodb({
          userId: userId,
          hwid: hwid,
          type: type,
          title: title,
          date: date,
          contents: data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("fail to insert mongodb", err);
      }
      break;
    case "image":
      try {
        data = req.body.contents;
        await insertMongodb({
          userId: userId,
          hwid: hwid,
          type: type,
          date: date,
          contents: data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("fail to insert mongodb", err);
      }
      break;
    case "template":
      try {
        data = req.body.contents;
        await insertMongodb({
          userId: userId,
          hwid: hwid,
          type: type,
          title: title,
          date: date,
          contents: data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("fail to insert mongodb", err);
      }
      break;
    case "text":
      try {
        data = req.body.contents;
        await insertMongodb({
          userId: userId,
          hwid: hwid,
          type: type,
          date: date,
          contents: data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("fail to insert mongodb", err);
      }
      break;
  }
  return res.status(200).send({
    status: "successful",
  });
});
router.get("beacon/getRecord", async (req, res) => {
  let record;
  try {
    await mongoClient.connect().then(async () => {
      record = await mongoClient
        .db(process.env.DB)
        .collection("beaconData")
        .find({ userId: req.query.userId })
        .sort({ $natural: -1 })
        .toArray();
    });
  } catch (err) {
    console.log(err);
  }
  res.status(200).send({ message: "successful", data: record });
});
router.get("/getCompanyInfo", async (req, res) => {
  let userId = req.query.userId;
  let data;
  try {
    await mongoClient.connect().then(async () => {
      data = await mongoClient
        .db(process.env.DB)
        .collection("company")
        .findOne({ user: userId });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "fail to find data" });
  }
  res.status(200).send({ message: "successful", data: data });
});
// router.post("/testInsert", async (req, res) => {
//   console.log(req.body);
//   try {
//     await mongoClient.connect().then(async () => {
//       await mongoClient
//         .db(process.env.DB)
//         .collection("company")
//         .insertOne(req.body);
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   res.status(200).send({ message: "successful" });
// });
//------------上傳公司圖片
router.post("/uploadCompanyImage", upload.single("image"), async (req, res) => {
  let imageurl = "";
  const Storage = getStorage(firebaseinit);
  const rand =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const bubbleRef = ref(Storage, `company/${rand}`);
  const upload = await uploadBytes(bubbleRef, req.file.buffer, {
    contentType: "image/jpeg",
  });
  const geturl = await getDownloadURL(bubbleRef).then((url) => {
    imageurl = url;
    // await mongoClient.connect.db(process.env.DB).collection("company").update({

    // })
  });
  res.status(200).send({
    status: "success",
    data: {
      url: imageurl,
    },
  });
});
//圖片上傳
router.post("/uploadImage", upload.single("image"), async (req, res) => {
  let imageurl = "";
  const Storage = getStorage(firebaseinit);
  const rand =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const bubbleRef = ref(Storage, `image/${rand}`);
  const upload = await uploadBytes(bubbleRef, req.file.buffer, {
    contentType: "image/jpeg",
  });
  const geturl = await getDownloadURL(bubbleRef).then((url) => {
    imageurl = url;
  });
  res.status(200).send({
    status: "success",
    data: {
      url: imageurl,
    },
  });
});
module.exports = router;
