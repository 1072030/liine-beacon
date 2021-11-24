<template>
  <div class="inputText">
    <div class="title">
      {{
        pattern === "text"
          ? "文字訊息"
          : pattern === "image"
          ? "圖片訊息"
          : pattern === "confirm"
          ? "確認訊息"
          : pattern === "imageCarousel"
          ? "圖片輪播訊息"
          : pattern === "bubble"
          ? "對話框訊息"
          : "對話框訊息-2"
      }}
    </div>

    <!-- {{ pattern }} -->
    <InputText v-if="pattern === 'text'" v-model="inputText" />
    <InputImage v-if="pattern === 'image'" v-model="inputImage" />
    <InputConfirm v-if="pattern === 'confirm'" v-model="inputConfirm" />
    <InputImageCarousel
      v-if="pattern === 'imageCarousel'"
      v-model="imageCarousel"
    />
    <InputBubble v-if="pattern === 'bubble'" v-model="bubble" />
    <div style="text-align: center; margin-top: 1rem">
      <el-button type="primary" @click="updateBeaconSetting">修改</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import InputText from "./beaconInputText.vue";
import InputImage from "./beaconInputImage.vue";
import InputImageCarousel from "./beaconInputImageCarousel.vue";
import InputBubble from "./beaconInputBubble.vue";
import InputConfirm from "./beaconInputConfirm.vue";
export default defineComponent({
  props: {},
  components: {
    InputText,
    InputImage,
    InputConfirm,
    InputImageCarousel,
    InputBubble,
  },
  setup() {
    const store = useStore();
    const inputText = ref("");
    const inputImage = ref("");
    const inputConfirm = ref("");
    const inputImageCarousel = ref("");
    const inputBubble = ref("");
    const pattern = computed(() => {
      return store.getters.userPatternMode;
    });
    const updateBeaconSetting = () => {
      console.log("test");
    };
    return {
      pattern,
      inputText,
      inputImage,
      inputConfirm,
      inputImageCarousel,
      inputBubble,
      updateBeaconSetting,
    };
  },
});
</script>
<style lang="scss">
.inputText {
  padding-top: 9rem;
  height: 80%;
  width: 60%;
  padding-left: 25%;
}
.title {
  border: 0.2rem solid rgb(165, 171, 255);
  border-radius: 8px;
  height: 50px;
  line-height: 3.35rem;
  font-size: 2rem;
  padding-left: 1rem;
  margin: 0 0 1.5rem 0;
  box-shadow: 3px 3px 3px rgb(197, 240, 240);
}
</style>
