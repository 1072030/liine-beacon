const createJson = (Data) => {
  console.log("Data", Data);
  let replyData = {};
  Object.assign(replyData, {
    type: "bubble",
    hero: Data.hero,
    body: Data.body,
    footer: Data.footer,
  });
  //-----------hero
  if (Data.hero.show == true) {
    delete replyData.hero.show;
  } else {
    delete replyData.hero;
  }
  //-----------body
  let bodyLen = Data.body.contents.length - 1;
  const title = Data.body.contents[0]; //文字標題
  if (title.show == false) {
    replyData.body.contents.splice(0, 1); //會留下空物件
    bodyLen--;
  } else {
    delete replyData.body.contents[0].show; //只刪掉show
    if (replyData.body.contents[0].size == undefined) {
      replyData.body.contents[0].size = 12;
    }
    replyData.body.contents[0].size = title.size.toString() + "px"; //替size加入px (符合reply規範)
  }
  const bodyContents = Data.body.contents[bodyLen].contents[0].contents; //找到文字內容
  bodyContents.map((x, index) => {
    for (let i = 0; i < x.contents.length; i++) {
      if (x.contents[i].show == false) {
        replyData.body.contents[bodyLen].contents[0].contents[
          index
        ].contents.splice(i, 1); //直接刪除 show==false
        i--; //因為第一筆被刪除了 數量-1
      } else {
        delete replyData.body.contents[bodyLen].contents[0].contents[index]
          .contents[i].show;
        if (
          replyData.body.contents[bodyLen].contents[0].contents[index].contents[
            i
          ].size == undefined
        ) {
          replyData.body.contents[0].size = 12;
        }
        replyData.body.contents[bodyLen].contents[0].contents[index].contents[
          i
        ].size = x.contents[i].size.toString() + "px"; //(符合reply規範)
      }
    }
  });
  //----------footer
  for (let i = 0; i < Data.footer.contents.length; i++) {
    if (Data.footer.contents[i].show == false) {
      replyData.footer.contents.splice(i, 1);
      i--;
    } else {
      delete replyData.footer.contents[i].show;
    }
  }
  return replyData;
};
module.exports = createJson;
