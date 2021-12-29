<template>
  <div class="preview-title">
    <span>歷史紀錄</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { getHistoryData } from "@/service/beacon";
export default defineComponent({
  setup() {
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const flexStructure = reactive({
      // hero: {
      //   type: "image",
      //   url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      //   size: "full",
      //   aspectRatio: "20:13",
      //   aspectMode: "cover",
      // },
      // body: {
      //   type: "box",
      //   layout: "vertical",
      //   contents: [
      //     {
      //       type: "text",
      //       text: "Brown Cafe",
      //       size: 22,
      //       color: "#000000",
      //       weight: "bold",
      //     },
      //     {
      //       type: "box",
      //       layout: "vertical",
      //       contents: [
      //         {
      //           type: "box",
      //           layout: "vertical",
      //           contents: [
      //             {
      //               type: "box",
      //               layout: "baseline",
      //               contents: [
      //                 {
      //                   type: "text",
      //                   text: "Place",
      //                   color: "#d3d3d3",
      //                   size: 14,
      //                   wrap: true,
      //                   flex: 1,
      //                 },
      //                 {
      //                   type: "text",
      //                   text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo No .1",
      //                   color: "#000000",
      //                   size: 14,
      //                   wrap: true,
      //                   flex: 5,
      //                 },
      //               ],
      //             },
      //             {
      //               type: "box",
      //               layout: "baseline",
      //               contents: [
      //                 {
      //                   type: "text",
      //                   text: "Time",
      //                   color: "#d3d3d3",
      //                   size: 14,
      //                   wrap: true,
      //                   flex: 1,
      //                 },
      //                 {
      //                   type: "text",
      //                   text: "10:00 - 23:00",
      //                   color: "#000000",
      //                   size: 14,
      //                   wrap: true,
      //                   flex: 5,
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // footer: {
      //   type: "box",
      //   layout: "vertical",
      //   contents: [
      //     {
      //       type: "button",
      //       action: {
      //         type: "uri",
      //         label: "CALL",
      //         uri: "https://line.me/zh-hant/",
      //       },
      //     },
      //     {
      //       type: "button",
      //       action: {
      //         type: "uri",
      //         label: "WEBSITE",
      //         uri: "https://developers.line.biz/flex-simulator/?status=success",
      //       },
      //     },
      //   ],
      // },
    });
    const historyData = ref([]);
    onMounted(() => {
      getHistoryData("fresh fruit", beaconId).then((res) => {
        console.log(res);
      });
    });
    return {
      flexStructure,
      historyData,
      beaconId,
    };
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
</style>
