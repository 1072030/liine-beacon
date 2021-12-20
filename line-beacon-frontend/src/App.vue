<template>
  <div v-if="frameWidth > 1000">
    <theNav />
    <router-view />
  </div>
  <div v-if="frameWidth < 1000">
    <test />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import theNav from "./components/BeaconTitle.vue";
import test from "./components/test.vue";
export default defineComponent({
  components: {
    theNav,
    test,
  },
  setup() {
    const frameWidth = ref();
    frameWidth.value = window.innerWidth;
    return { frameWidth };
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}
</style>
