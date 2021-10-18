<template>
  <div>
    <el-select v-model="imageNumbers" placeholder="選擇圖片輪播數量">
      <el-option
        v-for="item in imageNumbersSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input v-model="altText" placeholder="訊息標頭" />
  </div>
  <div style="margin: 2rem 0; display: inline-block">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <div style="width: 226px">
      <el-select v-model="Pattern" placeholder="選擇回傳訊息樣板">
        <el-option
          v-for="item in PatternSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="actionLabel"
        placeholder="圖片上訊息"
        v-if="Pattern === 'text' || 'uri'"
      />
      <el-input
        v-model="actionText"
        placeholder="回傳文字"
        v-if="Pattern === 'text'"
      />
      <el-input
        v-if="Pattern === 'uri'"
        v-model="actionUri"
        placeholder="顯示網址"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const imageNumbers = ref("");
    const imageNumbersSelect = ref([
      {
        value: "1",
        label: "1",
      },
      {
        value: "2",
        label: "2",
      },
      {
        value: "3",
        label: "3",
      },
      {
        value: "4",
        label: "4",
      },
      {
        value: "5",
        label: "5",
      },
      {
        value: "6",
        label: "6",
      },
      {
        value: "7",
        label: "7",
      },
      {
        value: "8",
        label: "8",
      },
      {
        value: "9",
        label: "9",
      },
      {
        value: "10",
        label: "10",
      },
    ]);
    const Pattern = ref("text");
    const PatternSelect = ref([
      {
        value: "text",
        label: "文字訊息",
      },
      {
        value: "uri",
        label: "網頁訊息",
      },
    ]);
    return {
      imageNumbers,
      imageNumbersSelect,
      Pattern,
      PatternSelect,
    };
  },
});
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
