const client = require("../config/line-config");
const handleText = async (message, replyToken, source) => {
  switch (message.text) {
    case "旭陽":
      return await client.pushMessage(source.userId, {
        type: "flex",
        altText: "this is title",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/%E6%97%AD%E9%99%BD%E5%8D%B3%E6%99%82%E5%A4%A9%E6%B0%A3%E6%8E%A8%E6%92%AD%E5%9C%96.jpg?alt=media&token=1e368758-e0e0-4727-9c48-071d1d134d39",
            size: "full",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://liff.line.me/1656701773-kbgOanL7",
            },
          },
        },
      });
  }
};

module.exports = handleText;
