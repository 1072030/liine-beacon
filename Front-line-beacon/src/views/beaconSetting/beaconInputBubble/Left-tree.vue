<template>
  <div id="left-pane">
    <div id="viewer-pane">
      <div class="fixposition">
        <div id="hero-box">
          <el-image :src="src" :fit="fit" class="imagePlaced"></el-image>
        </div>
        <div class="body-box">
          <p class="body-title">This is title</p>
          <div class="body-content">
            <div style="display: flex">
              <div class="body-sm-title">Place</div>
              <div class="body-sm-text">
                Miraina Tower, 4-1-6 Shinjuku, Tokyo
              </div>
            </div>
            <div>
              <div class="body-sm-title">123</div>
              <div class="body-sm-text">123</div>
            </div>
          </div>
        </div>
        <div class="footer-box">234</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {},
  setup(props, context) {
    const src = ref("");
    src.value =
      "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
    const fit = ref("");
    fit.value = "cover";
    return {
      src,
      fit,
    };
  },
});
</script>
<style lang="scss">
#left-pane {
  border-radius: 5px;
  max-width: 400px;
  height: 100%;
  text-align: center;
  margin: 0 auto;
}
#viewer-pane {
  padding-top: 5%;
  height: 100%;
}
#hero-box {
  word-wrap: break-word;
}
.imagePlaced {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.fixposition {
  width: 250px;
}
.body-box {
  text-align: left;
  padding: 5% 5%;
  p {
    margin: 0;
  }
  .body-title {
    margin: 0px 0px 5px 0px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 22px;
  }
}
.body-content {
  display: inline-block;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .body-sm-title {
    display: inline-block;
    color: lightgray;
    font-size: 14px;
    padding-right: 6px;
  }
  .body-sm-text {
    display: inline-block;
    font-size: 14px;
  }
}
.footer-box {
  padding: 5% 10%;
}
</style>
