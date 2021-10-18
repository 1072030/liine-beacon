<template>
  <div>
    <el-select v-model="imageNumbers" placeholder="選擇圖片輪播數量">
      <el-option
        @change="changeVal($event)"
        v-for="item in imageNumbersSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input v-model="altText" placeholder="訊息標頭" />
  </div>
  <div v-for="items in numbershow" :key="items" style="display: inline-block">
    <replyInputCarosel />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import replyInputCarosel from "../../components/replyInputCarosel.vue";
export default defineComponent({
  components: { replyInputCarosel },
  setup() {
    const imageNumbers = ref("1");
    const imageNumbersSelect = ref([
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
    const numbershow = computed(() => {
      if (imageNumbers.value) {
        return parseInt(imageNumbers.value);
      } else {
        return 1;
      }
    });

    return {
      imageNumbers,
      imageNumbersSelect,
      numbershow,
    };
  },
});
</script>
