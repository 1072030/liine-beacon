<template>
  <div id="main-pane">
    <div id="left-pane">
      <div id="viewer-pane">
        <img id="viewer-frame" src="../../assets/template1.png" alt="" />
        <!-- <iframe id="viewer-frame" src="" frameborder="0"></iframe> -->
      </div>
    </div>
    <div id="center-pane" :class="header">
      <div id="tree-pane">
        <ul>
          <li class="bubble">
            <div>123456</div>
            <ul></ul>
          </li>
        </ul>
      </div>
    </div>
    <div id="right-pane">
      <div class="demo-color-block">
        <el-color-picker v-model="color1" />
      </div>
      <div>
        <el-radio-group v-model="radio">
          <el-radio :label="1">置左</el-radio>
          <el-radio :label="2">置中</el-radio>
          <el-radio :label="3">置右</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const color1 = ref("red");
    const radio = ref(1);
    const fixPosition = ref("");
    watch(radio, (newValue) => {
      newValue === 1
        ? (fixPosition.value = "left")
        : newValue === 2
        ? (fixPosition.value = "center")
        : (fixPosition.value = "right");
    });
    return {
      radio,
      color1,
      color: color1,
      fontSize: "30px",
      textAlign: fixPosition,
    };
  },
});
</script>
<style lang="scss">
.header {
  color: v-bind(color);
  font-size: v-bind(fontSize);
  text-align: v-bind(textAlign);
}
#main-pane {
  display: flex;
}
#left-pane {
  padding-top: 50px;

  flex: 0 0 300px;
}
#viewer-pane {
  width: 300px;
  flex: 0 0 100%;
}
#viewer-frame {
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: block;
  border: 0;
  overflow: hidden;
  width: 250px;
}
#center-pane {
  flex: 25%;
}
#tree-pane ul:hover {
  background-color: #444;
}
.focused {
  background-color: #255e9a;
}
#right-pane {
  flex: 0 0 35%;
}
</style>
