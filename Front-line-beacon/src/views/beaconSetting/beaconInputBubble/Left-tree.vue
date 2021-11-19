<template>
  <div id="left-pane">
    <div id="viewer-pane">
      <div class="fixposition" :model="DataInfo">
        <div class="hero-box" @click="select(DataInfo.contents[0].hero[0])">
          <el-image
            :src="DataInfo.contents[0].hero[0].src"
            :fit="DataInfo.contents[0].hero[0].fit"
            class="imagePlaced"
          ></el-image>
        </div>
        <div class="body-box">
          <div>
            <div
              @click="select(DataInfo.contents[0].body[0])"
              style="display: inline"
            >
              <p class="body-title">
                {{ DataInfo.contents[0].body[0].text }}
              </p>
            </div>
            <div
              class="body-content"
              v-for="(contentData, index) in DataInfo.contents[0].body"
              :key="index"
            >
              <div style="display: flex; flex-direction: row">
                <div
                  class="body-sm-title"
                  v-if="index >= 1"
                  @click="select(contentData.contents[0])"
                >
                  {{ contentData.contents[0].text }}
                </div>
                <div
                  class="body-sm-text"
                  v-if="index >= 1"
                  @click="select(contentData.contents[1])"
                >
                  {{ contentData.contents[1].text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-box">
          <div
            class="footer-btn"
            v-for="(footerData, index) in DataInfo.contents[0].footer"
            :key="index"
            @click="select(DataInfo.contents[0].footer[index])"
          >
            <div>{{ footerData.action.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
//import { Text } from "../../../common/type";
export default defineComponent({
  props: {},
  emits: ["setPageAction"],
  setup(props, context) {
    const DataInfo = ref({
      contents: [
        {
          header: [],
          hero: [
            {
              type: "image",
              src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
              fit: "cover",
            },
          ],
          body: [
            {
              type: "text",
              text: "Brown Cafe",
              size: "18px",
              color: "",
              show: true,
            },
            {
              contents: [
                {
                  type: "text",
                  text: "Place",
                },
                {
                  type: "text",
                  text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo No .1",
                },
              ],
            },
            {
              contents: [
                {
                  type: "text",
                  text: "Time",
                },
                {
                  type: "text",
                  text: "10:00 - 23:00",
                },
              ],
            },
          ],
          footer: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "CALL",
                uri: "https://v3.vuejs.org/guide/migration/v-model.html#migration-strategy",
              },
            },
            {
              type: "button",
              action: {
                type: "uri",
                label: "WEBSITE",
                uri: "https://developers.line.biz/flex-simulator/?status=success",
              },
            },
          ],
        },
      ],
    });

    const select = (data: any) => {
      context.emit("setPageAction", data);
    };
    return {
      DataInfo,
      select,
    };
  },
});
</script>
<style lang="scss">
#left-pane {
  border-radius: 5px;
  max-width: 400px;
  height: 100%;
  text-align: center;
  margin: 0 auto;
}
#viewer-pane {
  padding-top: 5%;
  height: 450px;
  width: 400px;
  background-color: antiquewhite;
}
.hero-box {
  word-wrap: break-word;
}
.imagePlaced {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.fixposition {
  width: 300px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
}
.body-box {
  text-align: left;
  padding: 5% 5%;
  p {
    margin: 0;
  }
  .body-title {
    margin: 0px 0px 5px 0px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 22px;
  }
  .body-content {
    display: flex;
    padding-top: 2px;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: block;
    }
    .body-sm-title {
      display: inline-block;
      color: lightgray;
      font-size: 14px;
      padding-right: 6px;
      flex-grow: 2;
    }
    .body-sm-text {
      display: inline-block;
      font-size: 14px;
      flex-grow: 8;
      width: 100%;
    }
  }
}

.footer-box {
  .footer-btn {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 40px;
    color: #42659a;
  }
  .footer-btn div {
    margin: 0 auto;
    padding: 0 5%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 40px;
    max-width: 100%;
  }
}
.displayShow {
  display: block;
}
.displayHide {
  display: none;
}
</style>
