<template>
  <div id="left-pane">
    <div id="viewer-pane">
      <img id="viewer-frame" src="../../../assets/template2.png" alt="" />
      <!-- <iframe id="viewer-frame" src="" frameborder="0"></iframe> -->
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
#left-pane {
  padding-top: 50px;
  flex: 0 0 300px;
}
#viewer-pane {
  width: 300px;
  flex: 0 0 100%;
}
#viewer-frame {
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: block;
  border: 0;
  overflow: hidden;
  width: 250px;
}
</style>
