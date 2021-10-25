<template>
  <div id="main-pane">
    <leftTree />
    <centerTree />
    <right-tree />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import leftTree from "./beaconInputBubble/Left-tree.vue";
import centerTree from "./beaconInputBubble/Center-tree.vue";
import rightTree from "./beaconInputBubble/Right-tree.vue";
export default defineComponent({
  components: {
    leftTree,
    centerTree,
    rightTree,
  },
  setup() {
    console.log("main");
  },
});
</script>
<style lang="scss">
#main-pane {
  display: flex;
}
</style>
