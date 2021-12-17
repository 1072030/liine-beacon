<template>
  <div>
    <div class="nav">
      <a href=""
        ><img
          src="https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/company.png?alt=media&token=88a61585-3212-42bd-a081-fed765e6bdde"
          alt=""
      /></a>
    </div>

    <div class="sidebar">
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

        <div style="padding-top: 20%">
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
      console.log(beaconId);
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
  height: 200px;
  line-height: 9;
  display: block;
  text-align: left;

  > a > img {
    position: absolute;
    width: 290px;
    height: 150px;
    left: 20px;
    top: 25px;
  }
}
.sidebar {
  margin: 12rem 0 0 3rem;
  display: inline-block;
  position: fixed;
  left: 0;
  height: 100%;
  > .insideSidebar {
    z-index: 2000;
  }
}

.labelAlign {
  font-size: 24px;
  line-height: 0.5;
  text-align: left;
  padding-left: 8%;
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
</style>
