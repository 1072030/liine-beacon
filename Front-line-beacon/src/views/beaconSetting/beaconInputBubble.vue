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
          <li>
            <div
              @click="isFocused = 'bubble'"
              :class="{ focused: isFocused === 'bubble' }"
              key="bubble"
            >
              <span class="node-icon"><i class="fa-right"></i></span>
              <span class="node-name">bubble</span>
            </div>
            <ul>
              <li>
                <div
                  @click="isFocused = 'header'"
                  :class="{ focused: isFocused === 'header' }"
                >
                  <span class="node-icon"><i class="fa-right"></i></span>
                  <span class="node-name">header</span>
                </div>
              </li>
              <li>
                <div>
                  <span class="node-icon"><i class="fa-right"></i></span
                  ><span class="node-name">hero</span>
                </div>
              </li>
              <li>
                <div>
                  <span class="node-icon"><i class="fa-right"></i></span
                  ><span class="node-name">body</span>
                </div>
              </li>
              <li>
                <div>
                  <span class="node-icon"><i class="fa-right"></i></span
                  ><span class="node-name">footer</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div id="right-pane">
      <!-- <div class="demo-color-block">
        <el-color-picker v-model="color1" />
      </div>
      <div>
        <el-radio-group v-model="radio">
          <el-radio :label="1">置左</el-radio>
          <el-radio :label="2">置中</el-radio>
          <el-radio :label="3">置右</el-radio>
        </el-radio-group>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isFocused = ref("");
    const select = ref("");

    const focusEvent = (event: any) => {
      isFocused.value = event.srcElement.innerText;
      select.value = event.srcElement.innerText;
    };
    return {
      isFocused,
      select,
      //fontSize: "30px",
      focusEvent,
    };
  },
});
</script>
<style lang="scss">
// .header {

//   color: v-bind(color);
//   font-size: v-bind(fontSize);
//   text-align: v-bind(textAlign);
// }
#main-pane {
  display: flex;
}
//---------------------------------------------Left-Tree-pane Start
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
//---------------------------------------------Left-Tree-pane End
//---------------------------------------------Center-Tree-pane Start
#center-pane {
  flex: 25%;

  min-width: 0;
}
#tree-pane {
  flex: 1 1 auto;
  background-color: #333;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  border-radius: 3%;
}
#tree-pane ul {
  position: relative;
  padding: 0;
}
#tree-pane li {
  color: #d0d0d0;
  margin-left: 10px;
  line-height: 1.5;
  list-style-type: none !important;
}
#tree-pane li > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
}
#tree-pane ul li div:hover {
  color: white;
  background-color: #444;
}
#center-pane li {
  list-style: none; //原始icon 消失
}
#tree-pane span.node-icon i {
  font-style: inherit;
  display: inline-block;
  width: 16px;
  text-align: center;
}
.node-name {
  user-select: none;
}
.fa-right::before {
  content: "\2B8A";
}
.fa-down::before {
  content: "\2B8B";
}
//---------------------------------------------Center-Tree-pane End
.focused {
  color: white;
  background-color: #255e9a !important;
}
#right-pane {
  flex: 0 0 30%;
}
</style>
