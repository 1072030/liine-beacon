<template>
  <div id="main-pane">
    <leftTree @setPageAction="setPageAction" v-model:DataInfo="DataInfo" />
    <!-- <centerTree /> -->
    <right-tree style="width: 50%" v-model:page="page" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import leftTree from "./beaconInputBubble/Left-tree.vue";
import rightTree from "./beaconInputBubble/Right-tree.vue";
//import centerTree from "./beaconInputBubble/Center-tree.vue";
export default defineComponent({
  components: {
    leftTree,
    rightTree,
    // centerTree,
  },
  setup() {
    const page = ref({});
    const setPageAction = (value: any) => {
      page.value = value;
      console.log("father component", page.value);
    };
    const DataInfo = ref({
      contents: {
        header: [],
        hero: {
          type: "image",
          src: "https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/4d3ea53c084bad6931a56d5158a48jpeg.jpeg?alt=media&token=3e06fbb5-e813-48d9-ad70-26b7fd85a396",
          fit: "cover",
          show: true,
        },
        body: [
          {
            type: "text",
            text: "Brown Cafe",
            fontsize: 22,
            color: "#000000",
            show: true,
          },
          {
            contents: [
              {
                type: "text",
                text: "Place",
                color: "#d3d3d3",
                fontsize: 14,
                show: true,
                flex: 1,
              },
              {
                type: "text",
                text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo No .1",
                color: "#000000",
                fontsize: 14,
                show: true,
                flex: 5,
              },
            ],
          },
          {
            contents: [
              {
                type: "text",
                text: "Time",
                color: "#d3d3d3",
                fontsize: 14,
                show: true,
                flex: 1,
              },
              {
                type: "text",
                text: "10:00 - 23:00",
                color: "#000000",
                fontsize: 14,
                show: true,
                flex: 5,
              },
            ],
          },
        ],
        footer: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "CALL",
              uri: "https://v3.vuejs.org/guide/migration/v-model.html#migration-strategy",
            },
            show: true,
          },
          {
            type: "button",
            action: {
              type: "uri",
              label: "WEBSITE",
              uri: "https://developers.line.biz/flex-simulator/?status=success",
            },
            show: true,
          },
        ],
      },
    });
    return {
      setPageAction,
      page,
      DataInfo,
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
