<template>
  <div class="inputText">
    {{ pattern }}
    <InputText v-if="pattern === 'text'" v-model:inputText="inputText" />
    <InputImage v-if="pattern === 'image'" />
    <InputImageCarousel v-if="pattern === 'imageCarousel'" />
    <InputBubble v-if="pattern === 'bubble'" />
    <div>
      <el-button type="primary">修改</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from "vue";
import { useStore } from "vuex";
import InputText from "./beaconInputText.vue";
import InputImage from "./beaconInputImage.vue";
import InputImageCarousel from "./beaconInputImageCarousel.vue";
import InputBubble from "./beaconInputBubble.vue";
export default defineComponent({
  components: {
    InputText,
    InputImage,
    InputImageCarousel,
    InputBubble,
  },
  setup() {
    const store = useStore();
    const inputText = ref("");
    const pattern = computed(() => {
      return store.getters.userPatternMode;
    });
    return {
      pattern,
      inputText,
    };
  },
});
</script>
<style lang="scss">
.inputText {
  margin: 4% 0 0 20%;
  width: 60%;
}
</style>
