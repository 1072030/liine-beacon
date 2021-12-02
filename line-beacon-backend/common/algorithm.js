const createJson = (Data) => {
  let replyData = {};
  Object.assign(replyData, {
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
  const title = Data.body.contents[0];
  if (title.show == false || title.show === undefined) {
    delete replyData.body.contents[0]; //刪掉titile
  } else {
    delete replyData.body.contents[0].show; //只刪掉show
    replyData.body.contents[0].size = title.size.toString() + "px";
  }
  const bodyContents = Data.body.contents[1].contents[0].contents;
  bodyContents.forEach((x, index) => {
    let isSplice = false;
    for (let i = 0; i <= x.contents.length - 1; i++) {
      if (isSplice == true && i > 0) {
        i -= 1;
      }
      isSplice = false;

      console.log("i", i);
      replyData.body.contents[1].contents[0].contents[index].contents[i].size =
        x.contents[i].size.toString() + "px";
      if (x.contents[i].show == false) {
        replyData.body.contents[1].contents[0].contents[index].contents.splice(
          i,
          1
        );
        isSplice = true;
      }
      if (isSplice == false) {
        delete replyData.body.contents[1].contents[0].contents[index].contents[
          i
        ].show;
      }
    }
  });
  //----------footer
  let isSplice = false;
  for (let i = 0; i <= Data.footer.contents.length; i++) {
    if (isSplice == true && i > 0) {
      i -= 1;
    }
    isSplice = false;
    console.log(Data.footer.contents[i]);
    if (Data.footer.contents[i].show == false) {
      replyData.footer.contents.splice(i, 1);
      isSplice = true;
    } else {
      delete replyData.footer.contents[i].show;
    }
  }
  if (replyData.body.contents[0] == null) {
    replyData.body.contents.splice(0, 1);
  }
  return replyData;
};
module.exports = createJson;
