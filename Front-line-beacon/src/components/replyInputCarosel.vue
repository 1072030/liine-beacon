<template>
  <div style="margin: 2rem 0rem; display: inline-block">
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
