<template>
  <div id="main-pane">
    <leftTree @setPageAction="setPageAction" />
    <!-- <centerTree /> -->
    <right-tree style="width: 50%" :page="page" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import leftTree from "./beaconInputBubble/Left-tree.vue";
import rightTree from "./beaconInputBubble/Right-tree.vue";
export default defineComponent({
  components: {
    leftTree,
    rightTree,
  },
  setup() {
    const page = ref({});
    const setPageAction = (value: any) => {
      page.value = value;
      console.log("father component", page.value);
    };
    return {
      setPageAction,
      page,
    };
  },
});
</script>
<style lang="scss">
#main-pane {
  height: 90%;
  display: flex;
}
</style>
