<template>
  <div id="center-pane">
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
              <div @click="isSelected">
                <span class="node-icon"><i class="fa-right"></i></span
                ><span class="node-name">hero</span>
              </div>
              <ul>
                <li>
                  <div>
                    <span class="node-icon"><i class="fa-image"></i></span
                    ><span class="node-name">image</span>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div @click="isSelected">
                <span class="node-icon"><i class="fa-right"></i></span
                ><span class="node-name">body</span>
              </div>
              <ul>
                <li>
                  <div>
                    <span class="node-icon"><i class="fa-text"></i></span
                    ><span class="node-name">Brown Cafe</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span class="node-icon"><i class="fa-right"></i></span
                    ><span class="node-name">box[vertical]</span>
                  </div>
                  <ul>
                    <li>
                      <div>
                        <span class="node-icon"><i class="fa-right"></i></span
                        ><span class="node-name">box[baseline]</span>
                      </div>
                      <ul>
                        <li>
                          <div>
                            <span class="node-icon"
                              ><i class="fa-text"></i></span
                            ><span class="node-name">text</span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <span class="node-icon"
                              ><i class="fa-text"></i></span
                            ><span class="node-name">text</span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <div @click="isSelected">
                <span class="node-icon"><i class="fa-right"></i></span
                ><span class="node-name">footer</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const isSelected = (event: any) => {
      console.log(event);
      switch (event.srcElement.nodeName) {
        case "DIV": {
          event.target.classList.toggle("focused");
          break;
        }
        case "SPAN": {
          event.target.parentElement.classList.toggle("focused");
          break;
        }
      }
    };
    return {
      isSelected,
    };
  },
});
</script>
<style lang="scss">
#center-pane {
  flex: 0 0 30%;
  display: flex;
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
  margin-left: 20px;
  line-height: 1.5;
  list-style-type: none !important;
}
#tree-pane > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
}
#tree-pane div:hover {
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
  content: "\2B9A";
}
.fa-down::before {
  content: "\2B9B";
}
.fa-image::before {
  content: "\1F5BC";
}
.fa-text::before {
  content: "\00C0";
}
.focused {
  color: white;
  background-color: #255e9a !important;
}
</style>
