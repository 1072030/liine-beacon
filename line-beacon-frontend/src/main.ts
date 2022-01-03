import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import liff from "@line/liff";
function initApp() {
  const app = createApp(App);
  app.use(store).use(router).use(ElementPlus).mount("#app");
}
async function initVue() {
  //   const liffId = await getLiffId();
  const myliffId = "1656701773-pqJ2V0KR";
  console.log("liffId", myliffId);
  try {
    liff.init({ liffId: myliffId }).then(async () => {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
      await liff
        .getProfile()
        .then((profile) => {
          store.commit("SET_USERDATA", profile);
          console.log("profile", profile);
        })
        .catch((err) => {
          console.log("error", err);
        });

      // liff.login().then(async () => {
      //   const profile = await liff.getProfile();
      //   console.log(profile);
      // });
      initApp();
    });
  } catch (err) {
    console.log(`liff.state init error ${err}`);
  }
}
initVue();
