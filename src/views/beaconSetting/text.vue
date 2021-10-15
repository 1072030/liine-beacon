<template>
  <div>
    <el-input
      v-model="inputTextValue"
      placeholder="輸入文字訊息"
      style="margin-bottom: 2rem"
    />
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
      console.log(23, newVal);
      context.emit("update:inputText", newVal);
    });
    return {
      inputTextValue,
    };
  },
});
</script>
>
