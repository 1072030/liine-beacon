const handleBeacon = require("./handleBeacon");
const handleEvent = async (event) => {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }
  switch (event.type) {
    case "beacon":
      return handleBeacon(event, event.replyToken);
  }
};

module.exports = handleEvent;
