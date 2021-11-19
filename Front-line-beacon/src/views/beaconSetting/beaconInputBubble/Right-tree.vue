<template>
  <div id="form-pane">
    <h1>
      {{
        page.type == "text"
          ? "Text"
          : page.type == "image"
          ? "Image"
          : page.type == "button"
          ? "Button"
          : ""
      }}
    </h1>

    <!-- v-if -->
    <div v-if="page.type == 'image'">
      <el-form ref="form" :model="Imageform" label-width="80px">
        <el-form-item label="Url">
          <el-input v-model="Imageform.url" placeholder="https://"></el-input>
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="Imageform.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="page.type == 'text'">
      <el-form ref="form" :model="Textform" label-width="100px">
        <el-form-item label="文字內容">
          <el-input v-model="Textform.content"></el-input>
        </el-form-item>
        <el-form-item label="文字大小">
          <el-input-number
            v-model="Textform.size"
            :min="1"
            :max="50"
            controls-position="right"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="文字顏色">
          <el-color-picker v-model="Textform.color" show-alpha />
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="Imageform.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="page.type == 'button'">
      <el-form ref="form" :model="Buttonform" label-width="100px">
        <el-form-item label="文字內容">
          <el-input v-model="Buttonform.label"></el-input>
        </el-form-item>
        <el-form-item label="回傳訊息模式">
          <el-select v-model="btnReplyType" placeholder="Select">
            <el-option
              v-for="item in Buttonform.actionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字訊息" v-if="btnReplyType == 'message'">
          <el-input
            v-model="Buttonform.message"
            placeholder="回傳文字"
          ></el-input>
        </el-form-item>
        <el-form-item label="連結網址" v-if="btnReplyType == 'uri'">
          <el-input v-model="Buttonform.uri" placeholder="https://"></el-input>
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="Buttonform.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    page: Object,
  },
  setup(props, { emit }) {
    const btnReplyType = ref("");
    const selectedType = ref({});
    //Object.assign(val.value, props.page);
    const Textform = ref({
      type: "text",
      text: "",
      size: 14,
      color: "rgba(19, 206, 102, 0.8)",
      show: true,
    });
    watch(
      () => props.page,
      (value, newValue) => {
        console.log("value", value);
        console.log(
          "Watch props.selected function called with args:",
          newValue
        );
        Object.assign(selectedType.value, value);
      }
    );
    const Imageform = ref({
      url: "",
      show: true,
    });
    const Buttonform = ref({
      actionType: [
        {
          value: "message",
          label: "文字訊息回傳",
        },
        {
          value: "uri",
          label: "網址連結回傳",
        },
      ],
      label: "",
      uri: "",
      message: "",
      show: true,
    });
    return {
      btnReplyType,
      Imageform,
      Textform,
      Buttonform,
      selectedType,
      ...toRefs(props),
    };
  },
});
</script>
<style lang="scss">
#right-pane {
  flex: 0 0 30%;
}
#form-pane > div > el-form > el-form-item {
  text-align: center;
}
</style>
