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
      style="display: inline-flex"
      ><div class="previewLabel" v-if="item.action.label !== ''">
        <span>{{ item.action.label }}</span>
      </div>
      <el-image
        style="width: 275px; height: 275px"
        :src="item.imageUrl"
        :fit="fit"
      >
        <template #error>
          <div class="image-slot previewImage">Image Not Found</div>
        </template></el-image
      >
      <div style="flex-direction: row">
        <div class="bodyContent">
          <el-form-item>
            <el-input placeholder="圖片連結" v-model="item.imageUrl" disabled />
          </el-form-item>
          <!-- <el-select
            v-model="item.action.type"
            placeholder="選擇回傳訊息樣板"
            style="width: 375px"
          >
            <el-option
              v-for="replyType in PatternSelect"
              :key="replyType"
              :label="replyType.label"
              :value="replyType.value"
            >
            </el-option>
          </el-select> -->
          <el-form-item>
            <el-input placeholder="圖片上訊息" v-model="item.action.label" />
          </el-form-item>
          <el-form-item v-if="item.action.type === 'uri'">
            <el-input placeholder="網址連結" v-model="item.action.uri" />
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <div style="text-align: center; margin-top: 1rem">
    <el-button type="primary" @click="generatorJson">修改</el-button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
export default defineComponent({
  setup() {
    let fileList = ref<Array<{ url: string }>>([]);
    // const PatternSelect = ref([
    //   {
    //     value: "text",
    //     label: "回傳文字訊息",
    //   },
    //   {
    //     value: "uri",
    //     label: "回傳網頁連結",
    //   },
    // ]);
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

    const input = computed(() => {
      let arr: Ref<any> = ref([]);
      for (let i = 0; i < imageNumbers.value; i++) {
        arr.value.push({
          imageUrl: "",
          action: {
            type: "uri",
            label: "",
            uri: "",
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
      imageNumbers,
      imageNumbersSelect,
      input,
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
  width: 148px;
  height: 148px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.previewImage {
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: inherit;
  height: 100%;
  background-color: #81ace9;
  color: white;
}
.previewLabel {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  z-index: 1;
  height: 375px;
  > span {
    border-radius: 25px;
    padding: 1px 8px;
    background-color: #7f7f7f;
    opacity: 0.8;
    color: white;
    margin-bottom: 15px;
  }
}
.bodyContent {
  width: 275px;
  margin-right: 5px;
}
</style>
