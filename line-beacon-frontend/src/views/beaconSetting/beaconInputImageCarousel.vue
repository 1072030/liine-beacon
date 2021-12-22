<template>
  <label class="label">圖片輪播訊息</label>
  <el-form>
    <el-form-item>
      <div style="display: inline-flex; width: 100%" class="carousel-title">
        <div>
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
        </div>
        <div>
          <el-input v-model="title" placeholder="訊息顯示標題" />
        </div>
      </div>
    </el-form-item>
    <el-form-item v-for="(item, index) in input" :key="index" class="default"
      ><div
        class="previewLabel"
        v-if="item.action.label !== '' && item.imageUrl !== ''"
      >
        <span>{{ item.action.label }}</span>
      </div>
      <el-image :src="item.imageUrl">
        <template #error>
          <div class="image-slot previewImage">預覽圖展示</div>
        </template></el-image
      >
      <div style="flex-direction: row">
        <div class="bodyContent">
          <el-form-item>
            <uploadImageTemp
              v-model:image="item.imageUrl"
              style="text-align: right"
            />
            <el-input placeholder="圖片連結" v-model="item.imageUrl" />
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="圖片上訊息"
              v-model="item.action.label"
              maxlength="12"
              show-word-limit
            />
          </el-form-item>
          <el-form-item v-if="item.action.type === 'uri'">
            <el-input placeholder="網址連結" v-model="item.action.uri" />
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <div>
    <el-button
      type="primary"
      class="submit-btn"
      @click="Submit"
      style="bottom: 10% !important"
      >更新訊息</el-button
    >
  </div>
</template>
<script lang="ts">
import uploadImageTemp from "../../components/upload-image.vue";
import { useStore } from "vuex";
import { computed, defineComponent, ref, Ref } from "vue";
export default defineComponent({
  components: {
    uploadImageTemp,
  },
  setup() {
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const title = ref("");
    let fileList = ref<Array<{ url: string }>>([]);
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
    // const beforeUpload = (file: File) => {
    //   const is10M = file.size / 1024 / 1024 < 0;
    //   console.log(is10M);
    // };
    // const handleUploadFile = async ({ file }: { file: File }) => {
    //   const url = await uploadImage(file);
    //   fileList.value = [{ url: url as string }];
    //   console.log(fileList.value);
    // };
    // const handleUploadSuccess = (index: number) => {
    //   console.log(index);
    //   fileList.value.map((x, index) => {
    //     console.log(x.url, index);
    //     input.value[index].imageUrl = x.url;
    //   });
    // };
    // const handleRemove = () => {
    //   fileList.value = [];
    // };
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
      type: "image_carousel",
      columns: input.value,
    });
    const Submit = async () => {
      let replyData = {};
      console.log(beaconId.value);
      Object.assign(replyData, {
        //userId之後改成line userId
        hwid: beaconId.value,
        userId: "fresh fruit",
        type: "template",
        title: title.value,
        contents: DataInfo.value,
      });
      console.log(JSON.stringify(replyData));
      //await beaconSetting(replyData);
    };
    return {
      fileList,
      DataInfo,
      title,
      imageNumbers,
      imageNumbersSelect,
      input,
      Submit,
      beaconId,
      // beforeUpload,
      // handleUploadFile,
      // handleUploadSuccess,
      // handleRemove,
    };
  },
});
</script>
<style lang="scss">
.el-image {
  > .el-image_inner {
    object-fit: cover;
  }
}
.default {
  display: inline-flex;
}
.previewImage {
  border-radius: 15px;
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
  height: 300px;
  > span {
    z-index: 1;
    border-radius: 25px;
    padding: 0.1px 7px;
    background-color: #7f7f7f;
    opacity: 0.8;
    color: white;
    margin-bottom: 15px;
    font-size: 10px;
    font-weight: bold;
  }
}
.bodyContent {
  width: 300px;
  margin-right: 5px;
  > .el-form-item {
    margin-bottom: 1%;
  }
}
.carousel-title {
  display: inline-flex;
  width: 100%;
  > div {
    flex: 1 0 0;
  }
}
.el-image {
  width: 300px;
  height: 300px;
  > .el-image__inner {
    object-fit: cover;
  }
}
</style>
