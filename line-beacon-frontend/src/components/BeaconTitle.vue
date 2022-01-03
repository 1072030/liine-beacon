<template>
  <div>
    <div class="nav">
      <div>
        <el-avatar
          class="userImage"
          :src="userPicture"
          :size="60"
          :fit="fit"
        ></el-avatar>
      </div>
      <span>{{ userName }}</span>
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
        :style="{
          position: 'absolute',
          width: '264px',
          height: '264px',
          bottom: '50%',
          zIndex: '1',
          opacity: '0.1',
          userSelect: 'none',
          pointerEvents: 'none',
        }"
      />
      <div class="insideSidebar">
        <p class="labelAlign">beacon編號 :</p>
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
            >
              <el-radio-button label="text" border>文字</el-radio-button>
              <el-radio-button label="image">圖片</el-radio-button>
              <el-radio-button label="imageCarousel"
                >圖片輪播樣板</el-radio-button
              >
              <el-radio-button label="bubble">對話框訊息樣板</el-radio-button>
              <el-radio-button label="history">歷史紀錄</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const fit = ref("fill");
    // onMounted(){
    //這裡要先取得beaconId 嵌入options
    // }
    const store = useStore();
    const userPicture = computed(() => {
      return store.getters.userData.pictureUrl;
    });
    const userName = computed(() => {
      return store.getters.userData.displayName;
    });
    const options = ref([
      {
        value: "32",
        label: "32",
      },
      {
        value: "50",
        label: "50",
      },
    ]);

    const pattern = ref("text");
    const selectMode = (pattern: string) => {
      store.commit("SET_PATTERN", pattern);
    };
    const selectBeacon = (beaconId: string) => {
      store.commit("SET_BEACONID", beaconId);
    };
    return {
      userName,
      userPicture,
      fit,
      options,
      beaconId: ref(),
      pattern,
      selectMode,
      selectBeacon,
    };
  },
});
</script>
<style lang="scss">
/* 刪除 1 */

.nav {
  justify-content: right;
  position: fixed;
  width: 95%;
  height: 120px;
  display: flex;
  > span {
    font-size: 28px;
    line-height: 4;
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
    width: 264px;
    height: 160px;
    bottom: 20%;
  }
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
