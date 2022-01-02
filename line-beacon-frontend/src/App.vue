<template>
  <div v-if="frameWidth >= 1040">
    <theNav />
    <router-view />
  </div>
  <div v-if="frameWidth < 1040">
    <block />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import theNav from "./components/BeaconTitle.vue";
import block from "./components/block.vue";
export default defineComponent({
  components: {
    theNav,
    block,
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
  color: #2c3e50;
}
.inputText {
  padding-top: 7%;
  width: 65%;
  padding-left: 26%;
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
  overflow-y: auto;
  width: 100%;
  height: 640px;
  background-color: #eaf0fb;
  border-radius: 10px;
  padding: 3% 2% 3% 5%;
}
</style>
