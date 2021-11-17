<template>
  <div id="main-pane">
    <leftTree />
    <!-- <centerTree /> -->
    <right-tree style="width: 50%" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import leftTree from "./beaconInputBubble/Left-tree.vue";

import rightTree from "./beaconInputBubble/Right-tree.vue";
export default defineComponent({
  components: {
    leftTree,
    rightTree,
  },
  setup() {
    console.log("main");
  },
});
</script>
<style lang="scss">
#main-pane {
  height: 90%;
  display: flex;
}
</style>
