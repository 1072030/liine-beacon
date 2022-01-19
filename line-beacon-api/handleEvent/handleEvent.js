const handleBeacon = require("./handleBeacon");
const handleText = require("./handleText");
const handleEvent = async (event) => {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }
  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return await handleText(message, event.source);
      }
    case "beacon":
      return handleBeacon(event, event.replyToken);
  }
};

module.exports = handleEvent;
