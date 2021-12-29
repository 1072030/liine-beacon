<template>
  <div class="bubble-title">
    <span>對話框樣板訊息</span>
    <el-input v-model="Messagetitle" placeholder="訊息顯示標題" />
  </div>
  <div class="bubble-info">
    對話框訊息樣板
    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      content="This is content"
    >
      <template #reference>
        <img
          src="https://img.icons8.com/windows/32/000000/info.png"
        /> </template
    ></el-popover>
  </div>

  <div id="main-pane">
    <leftTree
      @selectedAction="selectedAction"
      v-model:DataInfo="DataInfo"
      v-model:validateData="validateData"
    />
    <!-- <centerTree /> -->
    <right-tree
      style="width: 50%"
      v-model:selected="selected"
      @validateDataAction="validateDataAction"
    />
  </div>
  <div class="submit">
    <div>
      <el-button type="primary" @click="generatorJson" class="submit-btn"
        >更新訊息</el-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import leftTree from "./beaconInputBubble/Left-tree.vue";
import rightTree from "./beaconInputBubble/Right-tree.vue";
import { beaconSetting } from "@/service/beacon";
import { elMessageBoxConfirm } from "@/util/globeMethod";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    leftTree,
    rightTree,
    // centerTree,
  },
  setup() {
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const selected = ref({});
    const Messagetitle = ref("");
    const outputJson: any = {};
    const validateData = ref(true);
    const validateDataAction = (check: any) => {
      validateData.value = check;
    };
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
              uri: "https://line.me/zh-hant/",
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
      let titleValidate = true;
      if (Messagetitle.value === "") {
        ElMessage.error("訊息顯示標題不能為空");
        titleValidate = false;
        return;
      }
      if (!validateData.value) {
        ElMessage.error("內容不得為空");
      }
      if (validateData.value && titleValidate) {
        Object.assign(replyData, {
          hwid: beaconId.value,
          userId: "fresh fruit",
          title: Messagetitle.value,
          type: "flex",
          contents: DataInfo.value,
        });
        const req = () => {
          beaconSetting(replyData);
        };
        elMessageBoxConfirm(
          {
            boxMessage: "確定要送出新增?",
            confirmMessage: "新增成功",
          },
          req
        );
      }
    };
    return {
      beaconId,
      selected,
      Messagetitle,
      DataInfo,
      outputJson,
      bubblePattern,
      validateData,
      generatorJson,
      selectedAction,
      validateDataAction,
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
  font-size: 36px;
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
.bubble-info {
  color: #2b3e63;
  font-size: 18px;
  margin-bottom: 3%;
  > img {
    width: 24px;
    vertical-align: text-bottom;
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
