<template>
  <div style="margin-bottom: 3%">
    <el-input v-model="title" placeholder="標題" />
  </div>
  <div id="main-pane">
    <leftTree @selectedAction="selectedAction" v-model:DataInfo="DataInfo" />
    <!-- <centerTree /> -->
    <right-tree style="width: 50%" v-model:selected="selected" />
  </div>
  <div style="text-align: center; margin-top: 1rem">
    <el-button v-loading="loading" type="primary" @click="generatorJson"
      >修改</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import leftTree from "./beaconInputBubble/Left-tree.vue";
import rightTree from "./beaconInputBubble/Right-tree.vue";
import { beaconSetting } from "@/service/beacon";
export default defineComponent({
  components: {
    leftTree,
    rightTree,
    // centerTree,
  },
  setup() {
    const loading = ref(false);
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const selected = ref({});
    const title = ref("");
    const outputJson: any = {};
    const selectedAction = (value: any) => {
      selected.value = value;
    };
    const DataInfo = ref({
      hero: {
        type: "image",
        url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        show: true,
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Brown Cafe",
            size: 22,
            color: "#000000",
            weight: "bold",
            show: true,
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "text",
                        text: "Place",
                        color: "#d3d3d3",
                        size: 14,
                        wrap: true,
                        show: true,
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo No .1",
                        color: "#000000",
                        size: 14,
                        show: true,
                        wrap: true,
                        flex: 5,
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "text",
                        text: "Time",
                        color: "#d3d3d3",
                        size: 14,
                        show: true,
                        wrap: true,
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "10:00 - 23:00",
                        color: "#000000",
                        size: 14,
                        show: true,
                        wrap: true,
                        flex: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
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
    const generatorJson = async () => {
      let replyData = {};

      loading.value = true;
      Object.assign(replyData, {
        //userId之後改成line userId
        hwid: beaconId.value,
        userId: "fresh fruit",
        title: title.value,
        type: "flex",
        contents: DataInfo.value,
      });
      await beaconSetting(replyData).then(() => {
        loading.value = false;
      });
    };
    return {
      beaconId,
      selected,
      title,
      DataInfo,
      outputJson,
      loading,
      generatorJson,
      selectedAction,
    };
  },
});
</script>
<style lang="scss">
#main-pane {
  height: 100%;
  display: flex;
}
</style>
