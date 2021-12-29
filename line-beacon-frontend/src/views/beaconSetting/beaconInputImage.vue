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
  <el-button type="primary" @click="submitImage" class="submit-btn"
    >更新訊息</el-button
  >
</template>

<script lang="ts">
import uploadImageTemp from "../../components/upload-image.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { elMessageBoxConfirm } from "@/util/globeMethod";
import { beaconSetting } from "@/service/beacon";
export default defineComponent({
  components: {
    uploadImageTemp,
  },
  setup() {
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const imageUrl = ref("");
    //     {
    //   "type": "image",
    //   "originalContentUrl": "PROVIDE_URL_FROM_YOUR_SERVER",
    //   "previewImageUrl": "PROVIDE_URL_FROM_YOUR_SERVER"
    // }
    const submitImage = () => {
      if (imageUrl.value !== "") {
        const req = () => {
          beaconSetting({
            userId: "fresh fruit",
            hwid: beaconId.value,
            type: "image",
            contents: {
              type: "image",
              originalContentUrl: imageUrl.value,
              previewImageUrl: imageUrl.value,
            },
          });
        };
        elMessageBoxConfirm(
          {
            boxMessage: "確定要送出新增?",
            confirmMessage: "新增成功",
          },
          req
        );
      } else {
        ElMessage.error("請上傳圖片");
      }
    };
    return {
      beaconId,
      imageUrl,
      submitImage,
    };
  },
});
</script>
