<template>
  <div>
    <div class="nav">
      <a href=""><img src="../assets/golfourit.png" alt="" /></a>
    </div>

    <div class="sidebar">
      <div class="insideSidebar">
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
          <el-select
            v-model="pattern"
            placeholder="選擇模式"
            @change="selectMode(pattern)"
          >
            <el-option
              v-for="item in patternOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
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
    const patternOption = ref([
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
    const pattern = ref("text");
    const selectMode = (pattern: string) => {
      store.commit("changePattern", pattern);
    };
    return {
      patternOption,
      options,
      beaconId: ref(),
      pattern,
      selectMode,
    };
  },
});
</script>
<style lang="scss">
.nav {
  z-index: 2000;
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: antiquewhite;
  line-height: 9;
  display: block;
  text-align: left;
  padding-left: 1.5rem;
}
.sidebar {
  margin: 7rem 0 0 2rem;
  display: inline-block;
  position: fixed;
  left: 0;
  height: 80%;

  padding: 2.5rem 2rem 0rem 0rem;
  z-index: 2000;
}
.insideSidebar {
  padding-right: 2rem;
  border-right: 0.1rem solid #676efa;
}
</style>
