<template>
  <div class="inputText">
    <div class="content">
      <InputText v-if="pattern === 'text'" />
      <InputImage v-if="pattern === 'image'" />
      <InputImageCarousel v-if="pattern === 'imageCarousel'" />
      <InputBubble v-if="pattern === 'bubble'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
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
