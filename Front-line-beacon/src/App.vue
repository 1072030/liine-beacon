<template>
  <div style="height: 100%">
    <div>
      <theNav />
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import theNav from "./components/BeaconTitle.vue";
export default defineComponent({
  components: {
    theNav,
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
