<template>
  <label class="label">圖片輪播訊息</label>

  <div class="carousel-title">
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
      <el-input v-model="Messagetitle" placeholder="訊息顯示標題" />
    </div>
  </div>
  <el-form>
    <el-form-item
      v-for="(item, index) in formContent"
      :key="index"
      class="default"
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
          <!-- :prop="input[0].imageUrl"
            :rules="{
              required: true,
              message: 'description is required',
              trigger: 'blur',
            }" -->
          <el-form-item>
            <uploadImageTemp
              v-model:image="item.imageUrl"
              style="text-align: right"
            />
            <el-input placeholder="圖片連結" v-model="item.imageUrl" disabled />
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="圖片上訊息"
              v-model="item.action.label"
              maxlength="12"
              show-word-limit
            />
          </el-form-item>
          <el-form-item>
            <el-input placeholder="網址連結" v-model="item.action.uri" />
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <div style="height: 100px">
    <el-button
      type="primary"
      class="submit-btn"
      @click="checkSubmitData"
      style="bottom: 10% !important"
      >更新訊息</el-button
    >
  </div>
</template>
<script lang="ts">
import uploadImageTemp from "../../components/upload-image.vue";
import { useStore } from "vuex";
import { computed, defineComponent, ref, Ref, watch } from "vue";
import { elMessageBoxConfirm } from "@/util/globeMethod";
import { ElMessage } from "element-plus";
import { beaconSetting } from "@/service/beacon";
export default defineComponent({
  components: {
    uploadImageTemp,
  },
  setup() {
    const store = useStore();
    const beaconId = computed(() => {
      return store.getters.userBeaconMode;
    });
    const userId = ref(store.state.userData.userId);
    const Messagetitle = ref("");
    const validateImage = ref();
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
    const formContent = computed(() => {
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
    watch(
      () => formContent.value,
      (change) => {
        let img = [];
        for (let i = 0; i < imageNumbers.value; i++) {
          if (change[i].imageUrl === "") {
            img.push(change[i].imageUrl);
          }
        }
        validateImage.value = img.every((x) => {
          x !== "";
        });
        console.log("img", validateImage.value);
      },
      {
        deep: true,
      }
    );
    const checkUrl = (url: string) => {
      const RegEx =
        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      return RegEx.test(url);
    };
    const checkSubmitData = () => {
      //validate
      let validateLabel = false;
      let validateUrl = false;
      let labelArr: string[] = [];
      let urlArr: string[] = [];
      formContent.value.map((x: any) => {
        labelArr.push(x.action.label);
        urlArr.push(x.action.uri);
      });
      if (!Messagetitle.value) {
        ElMessage.error("訊息顯示標題不能為空");
        return;
      }
      if (beaconId.value === "") {
        ElMessage.error("請選擇要修改的beacon");
        return;
      }
      if (!validateImage.value) {
        ElMessage.error("請上傳圖片");
        return;
      }
      validateLabel = labelArr.every((x: any, index: number) => {
        if (x != "") {
          return true;
        } else {
          ElMessage.error(`第${index + 1}格訊息不能為空`);
          return false;
        }
      });
      if (!validateLabel) {
        return;
      }
      validateUrl = urlArr.every((x: any, index: number) => {
        const check = checkUrl(x);
        if (check) {
          return true;
        } else {
          ElMessage.error(`第${index + 1}格Url不符合規定`);
          return false;
        }
      });
      if (validateLabel && validateUrl && validateImage.value) {
        const req = async () => {
          let replyData = {};
          const dateTimestamp = Date.now();
          Object.assign(replyData, {
            hwid: beaconId.value,
            userId: userId.value,
            type: "template",
            title: Messagetitle.value,
            date: dateTimestamp,
            contents: {
              type: "image_carousel",
              columns: formContent.value,
            },
          });
          await beaconSetting(replyData);
          //console.log("test", JSON.stringify(replyData));
        };
        elMessageBoxConfirm(
          {
            boxMessage: "確定要送出新增?",
            confirmMessage: "新增成功",
          },
          req
        );
      }
    };

    return {
      userId,
      fileList,
      Messagetitle,
      imageNumbers,
      imageNumbersSelect,
      formContent,
      beaconId,
      validateImage,
      checkUrl,
      checkSubmitData,
      // checkValidate,
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
    padding: 0.1px 10px;
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
  // > .el-form-item {
  //   margin-bottom: 1%;
  // }
}
.carousel-title {
  margin-bottom: 3%;
  display: inline-flex;
  width: 100%;
  > div {
    flex: 1 0 0;
  }
}
.el-image {
  width: 300px;
  height: 300px;
  background-color: white;
  > .el-image__inner {
    object-fit: cover;
  }
}
</style>
<style lang="scss" scoped>
.el-image {
  border-radius: 25px;
}
</style>
