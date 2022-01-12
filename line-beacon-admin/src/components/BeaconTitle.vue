<template>
  <div>
    <div class="nav">
      <div>
        <div
          :style="{
            paddingLeft: '5rem',
          }"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            :http-request="handleUploadFile"
            :show-file-list="false"
            v-loading="uploadLoading"
            v-if="companyPic == ''"
          >
            <span style="color: gray; font-style: oblique; opacity: 0.5"
              >點擊新增LOGO</span
            >
          </el-upload>
        </div>

        <el-image
          v-if="companyPic != ''"
          :style="{
            paddingLeft: '5rem',
            width: '148px',
            height: '148px',
            objectFit: 'fit',
          }"
          :src="companyPic"
        ></el-image>
        <div
          :style="{
            position: 'absolute',
            top: '142px',
            left: '235px',
          }"
        >
          <el-upload
            action="#"
            list-type="upload-demo"
            :limit="10"
            :http-request="handleUploadFile"
            :before-upload="beforeAvatarUpload"
            v-loading="uploadLoading"
            :show-file-list="false"
            v-if="companyPic != ''"
          >
            <el-button size="small" type="primary" :loading="loading" round
              >上傳圖片</el-button
            >
          </el-upload>
        </div>
      </div>
      <div
        :style="{
          display: 'flex',
          paddingTop: '1.5%',
          paddingRight: '1%',
        }"
      >
        <el-avatar
          class="userImage"
          :src="userPicture"
          :size="40"
          :style="{
            objectFit: 'fit',
          }"
        ></el-avatar>

        <span
          :style="{
            fontSize: ' 0.8rem',
            lineHeight: '3.5',
            paddingLeft: '10px',
          }"
        >
          {{ userName }}</span
        >
      </div>
    </div>

    <div class="sidebar">
      <a href=""
        ><img
          src="https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/JD.png?alt=media&token=1ed25333-4178-4374-a69e-a56fd2ed516c"
          alt=""
      /></a>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/blue_chicken_logo.png?alt=media&token=cf01ea93-09e9-4898-880a-d37a31d68134"
        alt=""
        class="blue-chicken"
      />
      <div class="insideSidebar">
        <p class="labelAlign">BEACON編號 :</p>
        <div style="margin-bottom: 1rem">
          <el-select
            v-model="beaconId"
            placeholder="beaconId"
            @change="selectBeacon(beaconId)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div>
          <p class="labelAlign">回傳訊息</p>
          <div>
            <el-radio-group
              v-model="pattern"
              style="display: flex; flex-direction: column"
              fill
              @change="selectMode(pattern)"
              ><el-radio-button label="bubble">對話框訊息樣板</el-radio-button
              ><el-radio-button label="imageCarousel"
                >圖片輪播樣板</el-radio-button
              >
              <el-radio-button label="text" border>文字</el-radio-button>
              <el-radio-button label="image">圖片</el-radio-button>

              <el-radio-button label="history">歷史紀錄</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { uploadImage } from "@/util/uploadImage";
import { useStore } from "vuex";
// import { ElMessage } from "element-plus";
import { beforeAvatarUpload } from "@/util/globeMethod";
export default defineComponent({
  setup() {
    const companyPic = ref("");
    const store = useStore();
    const uploadLoading = ref(false);
    const userPicture = computed(() => {
      return store.getters.userData.pictureUrl;
    });
    const userName = computed(() => {
      return store.getters.userData.displayName;
    });
    const companyInfo = computed(() => {
      return store.getters.companyInfo;
    });
    // const options = ref([
    //   {
    //     value: "32",
    //     label: "32",
    //   },
    //   {
    //     value: "50",
    //     label: "50",
    //   },
    // ]);
    const options = computed(() => {
      let arr: Ref<any> = ref([]);
      for (let i = 0; i < companyInfo.value.beacon.length; i++) {
        arr.value.push({
          label: companyInfo.value.beacon[i],
          value: companyInfo.value.beacon[i],
        });
      }
      return arr.value;
    });
    const handleUploadFile = async ({ file }: { file: File }) => {
      uploadLoading.value = true;
      const place = companyInfo.value.companyId;
      const url = await uploadImage(file, place);
      uploadLoading.value = false;
      companyPic.value = url;
    };
    const pattern = ref("bubble");
    const selectMode = (pattern: string) => {
      store.commit("SET_PATTERN", pattern);
    };
    const selectBeacon = (beaconId: string) => {
      store.commit("SET_BEACONID", beaconId);
    };
    return {
      companyInfo,
      uploadLoading,
      companyPic,
      userName,
      userPicture,
      options,
      beaconId: ref(),
      pattern,
      beforeAvatarUpload,
      handleUploadFile,
      selectMode,
      selectBeacon,
    };
  },
});
</script>
<style lang="scss">
/* 刪除 1 */

.nav {
  justify-content: space-between;
  position: fixed;
  width: 95%;
  height: 120px;
  display: flex;
  > span {
    font-size: 0.8rem;
    line-height: 7;
  }
  > div {
    padding-top: 1.5%;
    padding-right: 1%;
  }
}
.sidebar {
  margin: 9rem 0 0 3rem;
  display: inline-block;
  position: fixed;
  left: 0;
  height: 100%;
  > .insideSidebar {
    z-index: 2000;
  }
  > a {
    pointer-events: none;
  }
  > a > img {
    position: absolute;
    width: 160px;
    height: 100px;
    bottom: 20%;
    left: 10%;
  }
}
.blue-chicken {
  position: absolute;
  width: 230px;
  height: 230px;
  bottom: 50%;
  left: 50px;
  z-index: 1;
  opacity: 0.1;
  user-select: none;
  pointer-events: none;
  border: 1px transparent;
  border-radius: 50%;
}
.labelAlign {
  font-size: 24px;
  line-height: 0.5;
  text-align: left;
  padding-left: 8%;
  padding-top: 10%;
  font-weight: bold;
}
.el-radio-group {
  > .el-radio-button {
    > span {
      border: 0px;
      border-left: 0px !important;
      --el-border-radius-base: 0px;
      width: 100%;
      color: #7e83b1;
      text-align: left;
    }
  }
}
.el-radio-button:focus-visible {
  > .el-radio-button__inner {
    background-color: black !important;
  }
}
.userImage {
  > img {
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }
}
</style>
