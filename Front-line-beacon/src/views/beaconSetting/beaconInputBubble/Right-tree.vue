<template>
  <div id="form-pane">
    <h1>圖片</h1>
    <!-- v-if -->
    <div style="display: flex">
      <label class="textTitle">url</label>
      <el-input
        class="inputContent"
        v-model="input"
        placeholder="輸入圖片連結"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    console.log("text");
  },
});
</script>
<style lang="scss">
#right-pane {
  flex: 0 0 30%;
}
.textTitle {
  flex: 1 auto;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
}
.inputContent {
  flex: auto;
  width: 80%;
}
</style>
