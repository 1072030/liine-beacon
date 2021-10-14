<template>
  <el-container>
    <el-header>
      <div style="background-color: antiquewhite">
        <img src="../assets/golfourit.png" alt="" />
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="margin: 1.3rem 0.5rem">
        <div>
          <el-select v-model="beaconId" placeholder="BeaconId">
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
      </el-aside>
      <el-main> </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
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
      beaconId: ref(""),
      patten: ref("text"),
    };
  },
});
</script>
<style lang="scss">
.el-header {
  text-align: left;
}
</style>
