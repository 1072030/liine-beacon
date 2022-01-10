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
    const userId = ref(store.state.userData.userId);
    const imageUrl = ref("");

    //     {
    //   "type": "image",
    //   "originalContentUrl": "PROVIDE_URL_FROM_YOUR_SERVER",
    //   "previewImageUrl": "PROVIDE_URL_FROM_YOUR_SERVER"
    // }
    const submitImage = () => {
      if (imageUrl.value === "") {
        ElMessage.error("請上傳圖片");
      } else if (beaconId.value === "") {
        ElMessage.error("請輸入修改的beaconId");
      } else {
        const req = () => {
          const dateTimestamp = Date.now();
          beaconSetting({
            userId: userId.value,
            hwid: beaconId.value,
            type: "image",
            date: dateTimestamp,
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
      }
    };
    return {
      userId,
      beaconId,
      imageUrl,
      submitImage,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-image {
  border-radius: 25px;
}
</style>
