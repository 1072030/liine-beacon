<template>
  <div>
    <el-select v-model="value" placeholder="選擇圖片輪播數量">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    const options = ref([
      {
        value: "1",
        label: "1",
      },
      {
        value: "2",
        label: "2",
      },
      {
        value: "3",
        label: "3",
      },
      {
        value: "4",
        label: "4",
      },
      {
        value: "5",
        label: "5",
      },
      {
        value: "6",
        label: "6",
      },
      {
        value: "7",
        label: "7",
      },
      {
        value: "8",
        label: "8",
      },
      {
        value: "9",
        label: "9",
      },
      {
        value: "10",
        label: "10",
      },
    ]);
    return {
      options,
      value,
    };
  },
});
</script>
