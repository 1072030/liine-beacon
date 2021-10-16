<template>
  <div style="margin: 2rem 0">
    <el-input v-model="inputTextValue" placeholder="輸入文字訊息" />
  </div>
  <div>
    <el-button type="primary" @click="updateBeaconSetting">修改</el-button>
  </div>
</template>

<script lang="ts">
import { api } from "@/util/api";
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  props: {
    inputText: String,
  },
  setup(props, context) {
    const inputTextValue = ref("");
    Object.assign(inputTextValue.value, props.inputText);
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
