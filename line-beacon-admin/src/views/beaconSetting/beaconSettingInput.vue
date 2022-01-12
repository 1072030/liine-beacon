<template>
  <div class="inputText">
    <div class="content">
      <InputBubble v-if="pattern === 'bubble'" />
      <InputImageCarousel v-if="pattern === 'imageCarousel'" />
      <InputText v-if="pattern === 'text'" />
      <InputImage v-if="pattern === 'image'" />
      <Preview v-if="pattern === 'history'" v-model:record="record" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getRecord } from "@/service/beacon";
import InputText from "./beaconInputText.vue";
import InputImage from "./beaconInputImage.vue";
import InputImageCarousel from "./beaconInputImageCarousel.vue";
import InputBubble from "./beaconInputBubble.vue";
import Preview from "./beaconPreview.vue";
export default defineComponent({
  components: {
    InputText,
    InputImage,
    InputImageCarousel,
    InputBubble,
    Preview,
  },
  setup() {
    const store = useStore();
    const pattern = computed(() => {
      return store.getters.userPatternMode;
    });
    const companyId = ref(store.getters.companyInfo.companyId);
    const record = ref([]);
    onMounted(async () => {
      await getRecord(companyId.value).then((res) => {
        record.value = res;
      });
    });
    return {
      companyId,
      pattern,
      record,
    };
  },
});
</script>
