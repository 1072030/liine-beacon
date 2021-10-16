<template>
  <div>
    <el-input
      v-model="inputTextValue"
      placeholder="輸入文字訊息"
      style="margin-bottom: 2rem"
    />
  </div>
  <div>
    <el-button type="primary" @click="updateBeaconSetting">修改</el-button>
  </div>
</template>

<script lang="ts">
import { api } from "@/util/api";
import { defineComponent, watch, ref, getCurrentInstance } from "vue";
export default defineComponent({
  props: {
    inputText: String,
  },
  setup(props, context) {
    const inputTextValue = ref("");
    Object.assign(inputTextValue.value, props.inputText);
    const { proxy } = getCurrentInstance()!;
    watch(inputTextValue, (newVal) => {
      context.emit("update:inputText", newVal);
      console.log();
    });
    const updateBeaconSetting = () => {
      const req = () => {
        api
          .post("/text", {
            inputTextValue,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      req;
    };
    return {
      inputTextValue,
      updateBeaconSetting,
    };
  },
});
</script>
>
