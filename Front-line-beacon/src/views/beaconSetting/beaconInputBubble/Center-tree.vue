<template>
  <div id="center-pane">
    <el-tree-v2
      class="tree-pane"
      :data="data"
      :props="props"
      :height="450"
      @node-click="checkSelected"
    ></el-tree-v2>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const checkSelected = (selected: any) => {
      console.log(selected);
    };
    const data = [
      {
        id: "header",
        label: "header",
        type: "bubble",
        children: undefined,
      },
      {
        id: "hero",
        label: "hero",
        children: [
          {
            id: "image",
            label: "image",
            type: "image",
            children: [],
          },
        ],
      },
      {
        id: "body",
        label: "body",
        type: "body",
        children: [
          {
            id: "box",
            label: "box",
            type: "box",
            children: [
              {
                id: "text",
                label: "text",
                type: "text",
                children: [],
              },
              {
                id: "box-1",
                label: "box-1",
                type: "box",
                children: [
                  {
                    id: "text",
                    label: "text",
                    type: "text",
                    children: [],
                  },
                ],
              },
              {
                id: "box-2",
                label: "box-2",
                type: "box",
                children: [
                  {
                    id: "text",
                    label: "text",
                    type: "text",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "footer",
        label: "footer",
        type: "footer",
        children: [
          {
            id: "box",
            label: "box",
            children: [
              {
                id: "button",
                label: "buttonLabel",
                type: "button",
                action: "uri" || "text",
                uri: undefined,
                text: undefined,
                children: [],
              },
            ],
          },
        ],
      },
    ];
    return {
      data: data,
      props: ref({
        id: "id",
        label: "label",
        type: "type",
        children: "children",
      }),
      checkSelected,
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
.test {
  content: "\2B9A";
}
.tree-pane {
  flex: 1 1 auto;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  border-radius: 3%;
}

.tree-pane > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
}
.tree-pane > div > el-tree-v2 {
  height: 100%;
}
.tree-pane span.node-icon i {
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
.tree-pane {
  color: white;
  .el-tree-virtual-list {
    background-color: #333;
    border-radius: 10px;
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: rgb(137, 129, 129);
  }
  .el-tree-node__content:hover {
    background-color: gray;
  }
  .el-tree-node {
    padding-top: 5px;
    padding-left: 5%;
    width: 95% !important;
  }
}
</style>
