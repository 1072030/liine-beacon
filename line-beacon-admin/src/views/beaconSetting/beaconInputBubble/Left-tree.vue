<template>
  <!-- {{ DataInfo.footer.contents }} -->

  <div id="left-pane">
    <div id="viewer-pane">
      <div
        class="fixposition"
        :model="DataInfo"
        :class="{ displayHide: !validateData }"
      >
        <div
          class="hero-box"
          @click="select(DataInfo.hero)"
          v-show="DataInfo.hero.show"
        >
          <el-image
            :src="DataInfo.hero.url"
            :fit="DataInfo.hero.aspectMode"
            class="imagePlaced"
          ></el-image>
        </div>
        <div class="body-box">
          <div class="col-box displayFlex">
            <div
              @click="select(DataInfo.body.contents[0])"
              :style="{
                fontSize: DataInfo.body.contents[0].size + 'px',
                color: DataInfo.body.contents[0].color,
              }"
              v-show="DataInfo.body.contents[0].show"
              class="body-title displayFlex"
            >
              <p>{{ DataInfo.body.contents[0].text }}</p>
            </div>
            <div
              class="body-content displayFlex"
              v-for="contentData in DataInfo.body.contents[1].contents[0]
                .contents"
              :key="contentData"
            >
              <div style="align-items: baseline" class="displayFlex">
                <div
                  class="body-sm-title displayFlex"
                  @click="select(contentData.contents[0])"
                  :style="{
                    fontSize: contentData.contents[0].size + 'px',
                    color: contentData.contents[0].color,
                    flexGrow: contentData.contents[0].flex,
                    WebkitBoxFlex: contentData.contents[0].flex,
                  }"
                  v-show="contentData.contents[0].show"
                >
                  <p>{{ contentData.contents[0].text }}</p>
                </div>
                <div
                  class="body-sm-text displayFlex"
                  @click="select(contentData.contents[1])"
                  :style="{
                    fontSize: contentData.contents[1].size + 'px',
                    color: contentData.contents[1].color,
                    flexGrow: contentData.contents[1].flex,
                    WebkitBoxFlex: contentData.contents[1].flex,
                  }"
                  :class="{ displayHide: !contentData.contents[1].show }"
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
            v-for="(footerData, index) in DataInfo.footer.contents"
            :key="index"
            :class="{ displayHide: !DataInfo.footer.contents[index].show }"
          >
            <div @click="select(DataInfo.footer.contents[index])">
              {{ footerData.action.label }}
            </div>
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
    validateData: Boolean,
  },
  emits: ["selectedAction"],
  setup(props, context) {
    const select = (data: any) => {
      context.emit("selectedAction", data);
    };
    return {
      select,
    };
  },
});
</script>
<style lang="scss">
body {
  line-height: 1.4;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
}
#left-pane {
  z-index: 1;
  border-radius: 5px;
  max-width: 400px;
  height: 100%;
  text-align: center;
}
#viewer-pane {
  padding: 5% 0%;
  width: 400px;
  background-color: #eaf0fb;
}
.hero-box {
  word-wrap: break-word;
}
.imagePlaced {
  height: 195px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.fixposition {
  width: 300px;
  background-color: white;
  border-radius: 10px;
}
.body-box {
  text-align: left;
  padding: 20px;
  padding-top: 19px;
  padding-bottom: 10px;
  div {
    width: 100%;
  }
  p {
    margin: 0;
  }
  .col-box {
    flex-direction: column;
    flex-basis: auto;
    flex: 1 0 0;
  }
  .body-title {
    flex-basis: auto;
    font-size: 22px;
    > p {
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .body-content {
    .body-sm-title {
      overflow: hidden;
      color: #d3d3d3;
      font-size: 12px;
      flex: 1 0 0;
      flex-grow: 1;
      -webkit-box-flex: 1;
      align-items: baseline;
      > p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      //white-space: nowrap;
    }
    .body-sm-text {
      margin-left: 4px;
      font-size: 12px;
      flex: 1 0 0;
      flex-grow: 5;
      -webkit-box-flex: 5;
      align-items: baseline;

      > p {
        overflow: visible;
        word-break: break-word;
        white-space: normal;
      }
    }
  }
}

.footer-box {
  padding: 10px;
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

.displayHide {
  display: none !important;
}
.displayShow {
  display: block;
}
.displayFlex {
  display: flex;
}
</style>
