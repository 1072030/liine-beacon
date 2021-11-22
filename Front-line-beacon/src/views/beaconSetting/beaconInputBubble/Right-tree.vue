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
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="Url">
          <el-input v-model="data.src" placeholder="https://"></el-input>
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="data.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="page.type == 'text'">
      <el-form ref="form" label-width="100px">
        <el-form-item label="文字內容">
          <el-input v-model="data.text"></el-input>
        </el-form-item>
        <el-form-item label="文字大小">
          <el-input-number
            v-model="data.fontsize"
            :min="12"
            :max="49"
            controls-position="right"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="文字顏色">
          <el-color-picker v-model="data.color" />
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="data.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="page.type == 'button'">
      <el-form ref="form" :model="data" label-width="100px">
        <el-form-item label="文字內容">
          <el-input v-model="data.action.label"></el-input>
        </el-form-item>
        <el-form-item label="回傳訊息模式">
          <el-select v-model="data.action.type" placeholder="Select">
            <el-option
              v-for="item in Buttonform.actionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字訊息" v-if="data.action.type == 'message'">
          <el-input
            v-model="data.action.message"
            placeholder="回傳文字"
          ></el-input>
        </el-form-item>
        <el-form-item label="連結網址" v-if="data.action.type == 'uri'">
          <el-input v-model="data.action.uri" placeholder="https://"></el-input>
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="data.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    page: Object,
  },
  setup(props, { emit }) {
    console.log(101, props);
    const data: any = computed(() => {
      return props.page;
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
      data,
      Buttonform,
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
