async function recreateJson(Data) {
  let replyData = { type: "bubble" };
  if (Data.hero.show == false) {
    console.log("no hero contents");
  } else {
    Object.assign(replyData, {
      hero: Data.hero,
    });
    delete replyData.hero.show;
  }
  console.log(replyData);
  return replyData;
}
module.exports = recreateJson;
