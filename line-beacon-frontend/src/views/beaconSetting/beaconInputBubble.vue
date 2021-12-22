<template>
  <div class="bubble-title">
    <span>對話框樣板訊息</span>
    <el-input v-model="title" placeholder="訊息顯示標題" />
  </div>
  <div style="color: #2b3e63; font-size: 18px; margin-bottom: 3%">
    對話框訊息樣板<img
      src="https://img.icons8.com/windows/32/000000/info.png"
      style="width: 24px; vertical-align: text-bottom"
    />
  </div>

  <div id="main-pane">
    <leftTree @selectedAction="selectedAction" v-model:DataInfo="DataInfo" />
    <!-- <centerTree /> -->
    <right-tree style="width: 50%" v-model:selected="selected" />
  </div>
  <div class="submit">
    <!-- <div>
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in bubblePattern"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div> -->
    <div>
      <el-button
        v-loading="loading"
        type="primary"
        @click="generatorJson"
        class="submit-btn"
        >更新訊息</el-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
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
    const bubblePattern = ref([
      {
        label: "樣板一",
        value: "bubble_1",
      },
      {
        label: "樣板二",
        value: "bubble_2",
      },
    ]);
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
              uri: "test",
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
    // watch(
    //   () => DataInfo.value,
    //   (old, news) => {
    //     console.log(old);
    //   },
    //   {
    //     deep: true,
    //   }
    // );
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
      console.log(JSON.stringify(replyData));
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
      bubblePattern,
      generatorJson,
      selectedAction,
    };
  },
});
</script>
<style lang="scss">
#main-pane {
  height: 65%;
  display: flex;
}
.el-input {
  > .el-input__inner {
    border-radius: 25px;
  }
}
.bubble-title {
  color: #2b3e63;
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 3%;
  display: flex;
  > span {
    flex: 2 0 0;
  }
  > .el-input {
    flex: 1 0 0;
  }
}
.submit {
  display: flex;
  > div:first-child {
    padding-left: 80px;
    flex: 5 0 0;
  }
  > div {
    flex: 1 0 0;
    > .el-button {
      font-size: 30px;
      height: 70px;
      width: 250px;
      border-radius: 25px;
      background-color: #2b3e63;
      font-weight: bold;
    }
  }
}
</style>
