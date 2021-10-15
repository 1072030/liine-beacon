<template>
  <div class="inputText">
    {{ pattern }}
    <theText v-if="pattern === 'text'" v-model:inputText="inputText" />
    <theImage v-if="pattern === 'image'" />
    <div>
      <el-button type="primary">修改</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from "vue";
import { useStore } from "vuex";
import theText from "./text.vue";
import theImage from "./image.vue";
export default defineComponent({
  components: {
    theText,
    theImage,
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
