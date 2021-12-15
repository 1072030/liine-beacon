<template>
  <el-upload
    action="#"
    list-type="upload-demo"
    :limit="1"
    :http-request="handleUploadFile"
    :on-remove="handleRemove"
    :file-list="fileList"
    :show-file-list="false"
    :class="{ hide: hideLogo }"
  >
    <el-button size="small" type="primary">上傳圖片</el-button>
  </el-upload>
</template>

<script lang="ts">
import { uploadImage } from "@/util/uploadImage";
import { ref } from "@vue/reactivity";
import { defineComponent, getCurrentInstance, watch } from "@vue/runtime-core";
export default defineComponent({
  props: ["image"],
  setup(props, context) {
    const hideLogo = ref(false);
    // const imageUrl: Ref<null | { url: string }> = ref(null);
    let fileList = ref<Array<{ url: string }>>([]);
    if (props.image && props.image.length - 2) {
      //props.image.length="{}"
      fileList.value = [{ url: props.image }];
      hideLogo.value = true;
    }

    watch(
      () => props.image,
      (n) => {
        console.log(n.length);
        if (n.length) {
          hideLogo.value = true;
          fileList.value = [{ url: n }];
        } else {
          fileList.value = [];
          hideLogo.value = false;
        }
      }
    );

    const { proxy } = getCurrentInstance()!;
    const handleRemove = () => {
      fileList.value = [];
      hideLogo.value = false;
      context.emit("update:image", "");
    };
    const handleUploadFile = async ({ file }: { file: File }) => {
      hideLogo.value = true;
      const url = await uploadImage(file);
      // imageUrl.value = { url: url as string };
      fileList.value = [{ url: url as string }];
      context.emit("update:image", url);
      console.log(url);
    };
    return {
      hideLogo,
      // fileList: imageUrl.value ? [imageUrl.value] : [],
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
