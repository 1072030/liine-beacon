<template>
  <div v-if="frameWidth >= 1200">
    <theNav />
    <router-view />
  </div>
  <div v-if="frameWidth < 1200">
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
  padding-top: 5.5rem;
  width: 65%;
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
.content {
  overflow-y: auto;
  width: 100%;
  height: 550px;
  background-color: #eaf0fb;
  border-radius: 10px;
  padding: 3% 2% 3% 5%;
}
.sidebar {
  > a > img {
    position: absolute;
    width: 160px;
    height: 100px;
    bottom: 20%;
    left: 10%;
  }
}
.content::-webkit-scrollbar {
  width: 0px;
}

// ::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
// }

// ::-webkit-scrollbar-thumb {
//   background-color: white;
//   border: 1px solid slategrey;
// }
@media only screen and (max-height: 780px) {
  //螢幕高度小於780
  .content {
    height: 500px;
  }
  .sidebar {
    > a > img {
      position: absolute;
      width: 180px;
      height: 114px;
      bottom: 25%;
      left: 10%;
    }
  }
}
@media only screen and (min-height: 830px) and (max-height: 949px) {
  //螢幕高度在949以下830以上
  .content {
    height: 600px;
  }
}
@media only screen and (min-height: 950px) {
  //螢幕高度在950px以上 高度700px
  .content {
    height: 700px;
  }
}
</style>
