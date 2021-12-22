<template>
  <label class="label">圖片訊息</label>
  <div style="width: 300px">
    <el-image :src="imageUrl">
      <template #error>
        <div class="image-slot previewImage">預覽圖展示</div>
      </template></el-image
    >
    <uploadImageTemp v-model:image="imageUrl" style="text-align: right" />
  </div>
  <el-button type="primary" class="submit-btn">更新訊息</el-button>
</template>

<script lang="ts">
import uploadImageTemp from "../../components/upload-image.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    uploadImageTemp,
  },
  setup() {
    const imageUrl = ref("");
    return {
      imageUrl,
    };
  },
});
</script>
