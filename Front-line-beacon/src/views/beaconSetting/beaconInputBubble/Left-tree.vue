<template>
  <div id="left-pane">
    <div id="viewer-pane">
      <div class="fixposition" :model="DataInfo">
        <div
          class="hero-box"
          @click="select(DataInfo.contents.hero)"
          v-show="DataInfo.contents.hero.show"
        >
          <el-image
            :src="DataInfo.contents.hero.src"
            :fit="DataInfo.contents.hero.fit"
            class="imagePlaced"
          ></el-image>
        </div>
        <!-- :style="`display: inline; font-size: ${DataInfo.contents.body[0].font}px;`" -->
        <div class="body-box">
          <div style="display: flex; flex-direction: column">
            <div
              @click="select(DataInfo.contents.body[0])"
              :style="{
                fontSize: DataInfo.contents.body[0].fontsize + 'px',
                color: DataInfo.contents.body[0].color,
              }"
              v-show="DataInfo.contents.body[0].show"
              class="body-title"
            >
              <p>{{ DataInfo.contents.body[0].text }}</p>
            </div>
            <div
              class="body-content"
              v-for="(contentData, index) in DataInfo.contents.body"
              :key="index"
            >
              <div style="display: flex; flex-direction: row">
                <div
                  class="body-sm-title"
                  v-if="index >= 1"
                  @click="select(contentData.contents[0])"
                  :style="{
                    fontSize: contentData.contents[0].fontsize + 'px',
                    color: contentData.contents[0].color,
                  }"
                  v-show="contentData.contents[0].show"
                >
                  <p>{{ contentData.contents[0].text }}</p>
                </div>
                <div
                  class="body-sm-text"
                  v-if="index >= 1"
                  @click="select(contentData.contents[1])"
                  :style="{
                    fontSize: contentData.contents[1].fontsize + 'px',
                    color: contentData.contents[1].color,
                  }"
                  v-show="contentData.contents[1].show"
                >
                  <p>{{ contentData.contents[1].text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-box">
          <div
            class="footer-btn"
            v-for="(footerData, index) in DataInfo.contents.footer"
            :key="index"
            @click="select(DataInfo.contents.footer[index])"
            v-show="DataInfo.contents.footer[index].show"
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
export default defineComponent({
  props: {
    DataInfo: Object,
  },
  emits: ["setPageAction"],
  setup(props, context) {
    const getStyle = ref({});
    const select = (data: any) => {
      getStyle.value = data;
      context.emit("setPageAction", data);
    };
    return {
      select,
      getStyle,
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
  padding: 5% 0%;
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
      // white-space: nowrap;
      display: block;
    }
    .body-sm-title {
      display: inline-block;
      color: #d3d3d3;
      font-size: 14px;
      padding-right: 6px;
      flex-grow: 2;
    }
    .body-sm-text {
      display: inline-block;
      // word-break: inherit;
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
