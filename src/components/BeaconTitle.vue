<template>
  <div class="nav">
    <a href=""><img src="../assets/golfourit.png" alt="" /></a>
  </div>

  <div class="sidebar">
    <div style="margin-bottom: 1rem">
      <el-select v-model="beaconId" placeholder="beaconId">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div>
      <el-select v-model="patten" placeholder="選擇模式">
        <el-option
          v-for="item in pattenOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const options = ref([
      {
        value: "38",
        label: "38",
      },
      {
        value: "50",
        label: "50",
      },
    ]);
    const pattenOption = ref([
      {
        value: "text",
        label: "文字",
      },
      {
        value: "image",
        label: "圖片",
      },
      {
        value: "confirm",
        label: "確認樣板",
      },
      {
        value: "imageCarousel",
        label: "圖片輪播樣板",
      },
      {
        value: "bubble",
        label: "對話框訊息樣板1",
      },
      {
        value: "bubble2",
        label: "對話框訊息樣板2",
      },
    ]);
    return {
      pattenOption,
      options,
    };
  },
});
</script>
<style lang="scss">
.nav {
  height: 100px;
  background-color: antiquewhite;
  line-height: 9;
  display: block;
  margin: 1rem;
  text-align: left;
  padding-left: 1.5rem;
}
.sidebar {
  margin: 0rem 2rem;
  display: inline-block;
  position: fixed;
  left: 0;
  height: 100%;
  border-right: 1px solid darkkhaki;
  padding: 2.5rem 2rem 0rem 0rem;
}
</style>
