<template>
  <div id="form-pane">
    <h1>
      {{
        selected.type == "text"
          ? "變更文字"
          : selected.type == "image"
          ? "變更圖片"
          : selected.type == "button"
          ? "變更按鈕"
          : ""
      }}
    </h1>

    <!-- type: 圖片-->
    <div v-if="selected.type == 'image'">
      <el-form ref="data" :model="data">
        <el-form-item
          prop="url"
          :rules="[
            {
              required: true,
              message: '請上傳圖片',
            },
          ]"
        >
          <el-input
            v-model="data.url"
            placeholder="URL"
            style="margin-bottom: 3%"
          ></el-input>
          <el-upload
            action="#"
            list-type="upload-demo"
            :limit="10"
            :http-request="handleUploadFile"
            :file-list="fileList"
            :show-file-list="false"
          >
            <el-button
              size="small"
              class="upload-btn"
              native-type="button"
              round
              :loading="btnLoading"
              >點選上傳圖片</el-button
            >
          </el-upload>
          <!-- <uploadImageTemp v-model:image="data.url" /> -->
          <!-- <el-button type="primary"
            ><el-icon> <Delete /> </el-icon
          ></el-button> -->
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="data.show"
            active-color="#9AE8C3"
            inactive-color="#FFFFFF"
          />
        </el-form-item>
      </el-form>
    </div>
    <!-- type: 文字 -->
    <div v-if="selected.type == 'text'">
      <el-form :model="data" ref="data">
        <el-form-item
          prop="text"
          :rules="[
            {
              required: true,
              message: '請輸入文字內容',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="data.text" placeholder="文字內容"></el-input>
        </el-form-item>
        <el-form-item
          prop="flex"
          :rules="[
            {
              required: true,
              message: '請輸入正確數字',
              trigger: 'blur',
            },
          ]"
          label="文字寬度 : "
        >
          <el-select v-model="data.flex" placeholder="Select">
            <el-option
              v-for="item in fontWidthOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="文字大小 : "
          prop="size"
          :rules="[
            {
              required: true,
              message: '請輸入正確數字',
              trigger: 'blur',
            },
          ]"
        >
          <el-select v-model="data.size" placeholder="Select">
            <el-option
              v-for="item in fontSizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input-number
            v-model="data.size"
            :min="12"
            :max="46"
            controls-position="right"
          /> -->
        </el-form-item>
        <el-form-item style="background-color: white; border-radius: 25px">
          <div style="display: flex; align-items: center">
            <el-color-picker
              v-model="data.color"
              style="
                vertical-align: text-top;
                padding-left: 15px;
                height: 50px;
                flex: 2 0 0;
                line-height: 6;
              "
            />
            <label style="flex: 8 0 auto; color: #7e7e7e">{{
              data.color
            }}</label>
            <label
              style="
                flex: 1 0 auto;
                color: #7e7e7e;
                font-size: 16px;
                font-weight: 600;
              "
              >文字顏色</label
            >
          </div>
        </el-form-item>

        <el-form-item label="顯示">
          <el-switch
            v-model="data.show"
            active-color="#9AE8C3"
            inactive-color="#FFFFFF"
          />
        </el-form-item>
      </el-form>
    </div>
    <!-- type: 按鈕 -->
    <div v-if="selected.type == 'button'">
      <el-form ref="data.action" :model="data.action">
        <el-form-item
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
        <!-- <el-form-item label="回傳訊息模式">
          <el-select v-model="data.action.type" placeholder="Select" disabled>
            <el-option
              v-for="item in Buttonform.actionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item
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
        </el-form-item> -->

        <el-form-item
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
          <el-input v-model="data.action.uri" placeholder="連結網址"></el-input>
        </el-form-item>
        <el-form-item label="顯示">
          <el-switch
            v-model="data.show"
            active-color="#9AE8C3"
            inactive-color="#FFFFFF"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from "vue";
import { uploadImage } from "@/util/uploadImage";
export default defineComponent({
  props: {
    selected: Object,
  },
  setup(props) {
    const btnLoading = ref(false);
    let fileList = ref<Array<{ url: string }>>([]);
    let fontSizeOptions = ref<any>([]);
    let fontWidthOptions = ref<any>([]);
    for (let i = 12; i <= 40; i++) {
      fontSizeOptions.value.push({
        value: i,
        label: JSON.stringify(i),
      });
    }
    for (let j = 1; j <= 20; j++) {
      fontWidthOptions.value.push({
        value: j,
        label: JSON.stringify(j),
      });
    }
    const data: any = computed(() => {
      return props.selected;
    });

    const Buttonform = ref({
      label: "",
      uri: "",
      show: true,
    });
    const handleUploadFile = async ({ file }: { file: File }) => {
      btnLoading.value = true;
      const url = await uploadImage(file);
      btnLoading.value = false;
      // imageUrl.value = { url: url as string };
      data.value.url = url;
    };
    return {
      data,
      Buttonform,
      fontSizeOptions,
      fontWidthOptions,
      btnLoading,
      ...toRefs(props),
      fileList,
      handleUploadFile,
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
.upload-btn {
  background-color: #7e83b1;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  > span {
    color: white;
  }
}
.upload-btn:hover {
  background-color: #7e83b1;
  > span {
    color: white;
  }
}
.upload-btn:not(:hover) {
  background-color: #7e83b1;
}
.el-form-item {
  > label {
    font-size: 18px;
    font-weight: 600;
  }
  .el-input {
    .el-input__inner {
      border-radius: 25px;
    }
  }
}
.el-switch {
  > .el-switch__core {
    > .el-switch__action {
      background: #2b3e63;
    }
  }
}
</style>
