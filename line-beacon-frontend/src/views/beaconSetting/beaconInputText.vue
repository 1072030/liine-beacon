<template>
  <div style="height: 490px">
    <label class="label">文字訊息</label>
    <el-input
      v-model="inputTextValue"
      type="textarea"
      placeholder="輸入文字訊息"
      :autosize="{ minRows: 7, maxRows: 8 }"
      resize="none"
    />
    <el-button type="primary" class="btn">更新訊息</el-button>
  </div>
</template>

<script lang="ts">
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
    return {
      inputTextValue,
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
.btn {
  position: absolute;
  font-size: 30px;
  height: 80px;
  width: 200px;
  border-radius: 25px;
  background-color: #2b3e63;
  font-weight: bold;
  right: 15%;
  bottom: 8%;
}
</style>
