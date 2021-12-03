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

    <!-- type: 圖片-->
    <div v-if="page.type == 'image'">
      <el-form ref="data" :model="data" label-width="80px">
        <el-form-item
          label="Url"
          prop="url"
          :rules="[
            {
              required: true,
              message: '請輸入圖片連結',
            },
          ]"
        >
          <el-input v-model="data.url" placeholder="https://"></el-input>
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
    <!-- type: 文字 -->
    <div v-if="page.type == 'text'">
      <el-form :model="data" ref="data" label-width="100px">
        <el-form-item
          label="文字內容"
          prop="text"
          :rules="[
            {
              required: true,
              message: '請輸入文字內容',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="data.text"></el-input>
        </el-form-item>
        <el-form-item label="文字內容寬度">
          <el-input-number
            v-model="data.flex"
            :min="1"
            :max="20"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item
          label="文字大小"
          prop="size"
          :rules="[
            {
              required: true,
              message: '請輸入正確數字',
              trigger: 'blur',
            },
          ]"
        >
          <el-input-number
            v-model="data.size"
            :min="12"
            :max="49"
            controls-position="right"
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
    <!-- type: 按鈕 -->
    <div v-if="page.type == 'button'">
      <el-form ref="data.action" :model="data.action" label-width="100px">
        <el-form-item
          label="文字內容"
          prop="label"
          :rules="[
            {
              required: true,
              message: '請輸入文字內容',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="data.action.label"> </el-input>
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
        <el-form-item
          label="文字訊息"
          prop="message"
          :rules="[
            {
              required: true,
              message: '請輸入文字訊息',
              trigger: 'blur',
            },
          ]"
          v-if="data.action.type == 'message'"
        >
          <el-input
            v-model="data.action.message"
            placeholder="回傳文字"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="連結網址"
          prop="uri"
          v-if="data.action.type == 'uri'"
          :rules="[
            {
              required: true,
              message: '請輸入圖片連結',
              trigger: 'blur',
            },
          ]"
        >
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
import { computed, defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  props: {
    page: Object,
  },
  setup(props, { emit }) {
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
