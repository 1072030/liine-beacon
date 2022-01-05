<template>
  <div class="preview-title">
    <span>歷史紀錄</span>
  </div>

  <div v-for="(item, index) in record.data" :key="index">
    <div :style="{ fontSize: '20px' }">
      <!-- {{ new Date(item.date).getDate() }} -->
      修改時間 : {{ new Date(item.date).getFullYear() }}/{{
        new Date(item.date).getMonth() + 1
      }}/{{ new Date(item.date).getDate() }}
      <br />
      beaconId : {{ item.hwid }}
    </div>
    <div
      :style="{
        padding: '2% 0%',
        width: '400px',
        backgroundColor: '#eaf0fb',
        textAlign: 'center',
      }"
      v-if="item.type === 'flex'"
    >
      <div class="fixposition">
        <div class="hero-box" v-if="item.contents.hero !== undefined">
          <el-image
            :src="item.contents.hero.url"
            :fit="item.contents.hero.aspectMode"
            class="imagePlaced"
          ></el-image>
        </div>
        <div class="body-box">
          <div class="col-box displayFlex">
            <div
              v-if="item.contents.body.contents[0].contents === undefined"
              :style="{
                fontSize: item.contents.body.contents[0].size + 'px',
                color: item.contents.body.contents[0].color,
              }"
              class="body-title displayFlex"
            >
              <p>{{ item.contents.body.contents[0].text }}</p>
            </div>
            <div v-if="item.contents.body.contents.length == 2">
              <div
                class="body-content displayFlex"
                v-for="(contentData, index) in item.contents.body.contents[1]
                  .contents[0].contents"
                :key="index"
              >
                <div style="align-items: baseline" class="displayFlex">
                  <div
                    v-if="contentData.contents[0] != undefined"
                    class="body-sm-title displayFlex"
                    :style="{
                      fontSize: contentData.contents[0].size,
                      color: contentData.contents[0].color,
                      flexGrow: contentData.contents[0].flex,
                      WebkitBoxFlex: contentData.contents[0].flex,
                    }"
                  >
                    <p>{{ contentData.contents[0].text }}</p>
                  </div>
                  <div
                    v-if="contentData.contents[1] != undefined"
                    class="body-sm-text displayFlex"
                    :style="{
                      fontSize: contentData.contents[1].size,
                      color: contentData.contents[1].color,
                      flexGrow: contentData.contents[1].flex,
                      WebkitBoxFlex: contentData.contents[1].flex,
                    }"
                  >
                    <p>{{ contentData.contents[1].text }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div
                class="body-content displayFlex"
                v-for="contentData in item.contents.body.contents[0].contents[0]
                  .contents"
                :key="contentData"
              >
                <div style="align-items: baseline" class="displayFlex">
                  <div
                    v-if="contentData.contents[0] != undefined"
                    class="body-sm-title displayFlex"
                    :style="{
                      fontSize: contentData.contents[0].size,
                      color: contentData.contents[0].color,
                      flexGrow: contentData.contents[0].flex,
                      WebkitBoxFlex: contentData.contents[0].flex,
                    }"
                  >
                    <p>{{ contentData.contents[0].text }}</p>
                  </div>
                  <div
                    v-if="contentData.contents[1] != undefined"
                    class="body-sm-text displayFlex"
                    :style="{
                      fontSize: contentData.contents[1].size,
                      color: contentData.contents[1].color,
                      flexGrow: contentData.contents[1].flex,
                      WebkitBoxFlex: contentData.contents[1].flex,
                    }"
                  >
                    <p>{{ contentData.contents[1].text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-box">
          <div
            class="footer-btn"
            v-for="(footerData, index) in item.contents.footer.contents"
            :key="index"
          >
            <div>{{ footerData.action.label }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.type == 'image'">
      <el-image
        :src="item.contents.originalContentUrl"
        class="previewImage"
      ></el-image>
    </div>
    <div
      v-if="item.type == 'text'"
      :style="{
        whiteSpace: 'pre-line',
        display: 'inline-table',
      }"
    >
      文字訊息內容 :
      <div
        :style="{
          display: 'inline-flex',
          padding: '12px 20px',
          borderRadius: '25px',
          backgroundColor: 'white',
          display: 'inline-flex',
        }"
      >
        {{ item.contents.text }}
      </div>
    </div>
    <div
      v-if="item.type === 'template'"
      :style="{
        margin: '2% 0%',
        width: '100%',
        lineHeight: '40px',
        position: 'relative',
        fontSize: '14px',
        minWidth: '0',
        display: 'flex',
        overflowX: 'auto',
      }"
    >
      <div
        v-for="(data, index) in item.contents.columns"
        :key="index"
        :style="{ paddingRight: '1rem' }"
      >
        <div>
          <div class="previewLabel" :style="{ width: '300px !important' }">
            <span>{{ data.action.label }}</span>
          </div>
          <el-image :src="data.imageUrl" class="previewImage"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    record: Object,
  },
});
</script>
<style lang="scss">
.preview-title {
  > span {
    color: #2b3e63;
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 3%;
  }
}
::-webkit-scrollbar {
  width: 1em;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: white;
  border: 1px solid slategrey;
}
</style>
