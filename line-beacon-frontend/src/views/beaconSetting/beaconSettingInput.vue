<template>
  <div class="inputText">
    <div class="content">
      <InputText v-if="pattern === 'text'" />
      <InputImage v-if="pattern === 'image'" />
      <InputImageCarousel v-if="pattern === 'imageCarousel'" />
      <InputBubble v-if="pattern === 'bubble'" />

      <!-- <div class="title">
      {{
        pattern === "text"
          ? "文字訊息"
          : pattern === "image"
          ? "圖片訊息"
          : pattern === "imageCarousel"
          ? "圖片輪播訊息"
          : pattern === "bubble"
          ? "對話框訊息"
          : "對話框訊息-2"
      }}
    </div> -->
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
export default defineComponent({
  props: {
    DataInfo: Object,
  },
  components: {
    InputText,
    InputImage,
    InputImageCarousel,
    InputBubble,
  },
  setup() {
    const store = useStore();
    const pattern = computed(() => {
      return store.getters.userPatternMode;
    });

    return {
      pattern,
    };
  },
});
</script>
<style lang="scss">
.inputText {
  padding-top: 9rem;
  width: 65%;
  padding-left: 22%;
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
.content {
  width: 100%;
  height: 100%;
  background-color: #eaf0fb;
  border-radius: 10px;
  padding: 5% 2% 3% 5%;
}
</style>
