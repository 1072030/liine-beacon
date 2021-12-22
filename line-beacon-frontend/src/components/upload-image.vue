<template>
  <el-upload
    action="#"
    list-type="upload-demo"
    :limit="1"
    :http-request="handleUploadFile"
    :on-remove="handleRemove"
    :file-list="fileList"
    :show-file-list="false"
  >
    <el-button size="small" type="primary" :loading="loading"
      >上傳圖片</el-button
    >
  </el-upload>
</template>

<script lang="ts">
import { uploadImage } from "@/util/uploadImage";
import { ref } from "@vue/reactivity";
import { defineComponent, watch } from "@vue/runtime-core";
export default defineComponent({
  props: ["image"],
  setup(props, context) {
    const loading = ref(false);
    // const imageUrl: Ref<null | { url: string }> = ref(null);
    let fileList = ref<Array<{ url: string }>>([]);
    if (props.image && props.image.length - 2) {
      //props.image.length="{}"
      fileList.value = [{ url: props.image }];
    }
    watch(
      () => props.image,
      (n) => {
        console.log(n.length);
        if (n.length) {
          fileList.value = [{ url: n }];
        } else {
          fileList.value = [];
        }
      }
    );
    const handleRemove = () => {
      fileList.value = [];
      context.emit("update:image", "");
    };
    const handleUploadFile = async ({ file }: { file: File }) => {
      loading.value = true;
      const url = await uploadImage(file);
      // imageUrl.value = { url: url as string };
      fileList.value = [{ url: url as string }];
      context.emit("update:image", url);
      loading.value = false;
      console.log(url);
    };
    return {
      // fileList: imageUrl.value ? [imageUrl.value] : [],
      loading,
      fileList,
      handleRemove,
      handleUploadFile,
    };
  },
});
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>
