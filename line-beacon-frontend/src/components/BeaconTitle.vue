<template>
  <div>
    <div class="nav"></div>

    <div class="sidebar">
      <a href=""
        ><img
          src="https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/JD.png?alt=media&token=1ed25333-4178-4374-a69e-a56fd2ed516c"
          alt=""
      /></a>
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
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    // onMounted(){
    //這裡要先取得beaconId 嵌入options
    // }
    const store = useStore();
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
      store.commit("changePattern", pattern);
    };
    const selectBeacon = (beaconId: string) => {
      store.commit("changeBeaconId", beaconId);
    };
    return {
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
  position: fixed;
  width: 100%;
  height: 150px;
  line-height: 9;
  display: block;
  text-align: left;
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
.el-radio-button:focus {
  background-color: black;
}
</style>
