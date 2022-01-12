<template>
  <el-upload
    action="#"
    list-type="upload-demo"
    :limit="5"
    :http-request="handleUploadFile"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList"
    :show-file-list="false"
  >
    <el-button size="small" type="primary" :loading="loading" round
      >上傳圖片</el-button
    >
  </el-upload>
</template>

<script lang="ts">
import { uploadImage } from "@/util/uploadImage";
import { ref } from "@vue/reactivity";
import { defineComponent, watch } from "@vue/runtime-core";
import { beforeAvatarUpload } from "@/util/globeMethod";
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
      fileList.value = [{ url: url as string }];
      context.emit("update:image", url);
      loading.value = false;
    };
    return {
      loading,
      fileList,
      handleRemove,
      beforeAvatarUpload,
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
