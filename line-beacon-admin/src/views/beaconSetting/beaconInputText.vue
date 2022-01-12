<template>
  <div style="height: 490px">
    <label class="label">文字訊息</label>
    <el-input
      v-model="textContent"
      type="textarea"
      placeholder="輸入文字訊息"
      :autosize="{ minRows: 7, maxRows: 8 }"
      resize="none"
    />
    <el-button type="primary" @click="submitText" class="submit-btn"
      >更新訊息</el-button
    >
  </div>
</template>

<script lang="ts">
import { beaconSetting } from "@/service/beacon";
import { elMessageBoxConfirm } from "@/util/globeMethod";
import { ElMessage } from "element-plus";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const textContent = ref("");
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const userId = ref(store.state.userData.userId);
    const companyId = ref(store.state.companyInfo.companyId);
    const submitText = () => {
      if (textContent.value === "") {
        ElMessage.error("內容不得為空");
      } else if (beaconId.value === "") {
        ElMessage.error("請輸入修改的beaconId");
      } else {
        const req = () => {
          const dateTimestamp = Date.now();
          beaconSetting({
            companyId: companyId.value,
            hwid: beaconId.value,
            userId: userId.value,
            type: "text",
            date: dateTimestamp,
            contents: {
              type: "text",
              text: textContent.value,
            },
          });
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
      textContent,
      submitText,
      beaconId,
    };
  },
});
</script>
<style lang="scss">
.label {
  display: block;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 52px;
  text-align: left;
  color: #2b3e63;
  margin-bottom: 2%;
}
.el-textarea {
  display: block;
  padding-top: 2%;
  margin-top: 5%;
  width: 557px;
  height: 314px;
  background: #ffffff;
  border-radius: 25px;
  > .el-textarea__inner {
    border: 0px;
    font-size: 24px;
  }
}
.submit-btn {
  margin-right: 5%;
  float: right;
  font-size: 30px;
  height: 80px;
  width: 250px;
  border-radius: 25px;
  background-color: #2b3e63;
  font-weight: bold;
}
</style>
