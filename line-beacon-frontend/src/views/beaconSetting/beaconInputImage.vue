<template>
  <el-image style="width: 300px; height: 300px" :src="imageUrl">
    <template #error>
      <div class="image-slot previewImage">預覽圖 僅供參考</div>
    </template></el-image
  >
  <uploadImageTemp v-model:image="imageUrl" />
</template>

<script lang="ts">
import uploadImageTemp from "../../components/upload-image.vue";
import { computed, defineComponent, ref, Ref } from "vue";
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
<style lang="scss">
.el-image {
  > .el-image__inner {
    object-fit: cover;
  }
}
</style>
