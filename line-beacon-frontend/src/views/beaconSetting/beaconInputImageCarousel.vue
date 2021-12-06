<template>
  <el-form>
    <el-form-item>
      <label>欄位數 : </label>
      <el-select v-model="imageNumbers" placeholder="選擇圖片輪播數量">
        <el-option
          v-for="item in imageNumbersSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="DataInfo.altText" placeholder="訊息標頭" />
    </el-form-item>
    <el-form-item
      v-for="(item, index) in input"
      :key="index"
      style="display: inline-flex; margin: 0"
    >
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="#"
          list-type="picture-card"
          :file-list="fileList"
          :http-request="handleUploadFile"
          :on-remove="handleRemove"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div style="flex-direction: row">
        <div style="width: 226px; margin-right: 5px">
          <el-select v-model="item.action.type" placeholder="選擇回傳訊息樣板">
            <el-option
              v-for="replyType in PatternSelect"
              :key="replyType"
              :label="replyType.label"
              :value="replyType.value"
            >
            </el-option>
          </el-select>
          <el-form-item>
            <el-input placeholder="圖片上訊息" v-model="item.action.label" />
          </el-form-item>
          <el-form-item v-if="item.action.type === 'uri'">
            <el-input placeholder="網址連結" v-model="item.action.content" />
          </el-form-item>
          <el-form-item v-if="item.action.type === 'text'">
            <el-input placeholder="文字訊息" v-model="item.action.content" />
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import { uploadImage } from "../../util/uploadImage";
export default defineComponent({
  setup() {
    let fileList = ref<Array<{ url: string }>>([]);
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
    const imageNumbers = ref(1);
    const imageNumbersSelect = ref([
      {
        value: 1,
        label: "1",
      },
      {
        value: 2,
        label: "2",
      },
      {
        value: 3,
        label: "3",
      },
      {
        value: 4,
        label: "4",
      },
      {
        value: 5,
        label: "5",
      },
      {
        value: 6,
        label: "6",
      },
      {
        value: 7,
        label: "7",
      },
      {
        value: 8,
        label: "8",
      },
      {
        value: 9,
        label: "9",
      },
      {
        value: 10,
        label: "10",
      },
    ]);
    const handleRemove = () => {
      fileList.value = [];
      // hideLogo.value = false;
      // context.emit("update:image", "");
    };
    const handleUploadFile = async ({ file }: { file: File }) => {
      const url = await uploadImage(file);
      // imageUrl.value = { url: url as string };
      fileList.value = [{ url: url as string }];
      console.log(url);
    };
    const input = computed(() => {
      let arr: Ref<any> = ref([]);
      for (let i = 0; i < imageNumbers.value; i++) {
        arr.value.push({
          imageUrl: "",
          action: {
            type: "text",
            label: "",
            content: "",
          },
        });
      }
      return arr.value;
    });
    const DataInfo = ref({
      type: "template",
      altText: "",
      template: {
        type: "image_carousel",
        columns: input,
      },
    });
    return {
      fileList,
      DataInfo,
      PatternSelect,
      imageNumbers,
      imageNumbersSelect,
      input,
      handleRemove,
      handleUploadFile,
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
  width: 178px;
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
