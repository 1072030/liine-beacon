import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {},
    patternMode: "text",
    beaconId: "",
  },
  getters: {
    userData: (state) => state.userData,
    userPatternMode: (state) => state.patternMode,
    userBeaconMode: (state) => state.beaconId,
  },
  mutations: {
    //store commit 的function
    SET_PATTERN: (state, pattern) => {
      state.patternMode = pattern;
    },
    SET_BEACONID: (state, beaconId) => {
      state.beaconId = beaconId;
    },
    SET_USERDATA: (state, value) => {
      console.log("set_userData");
      state.userData = value;
    },
  },
  actions: {},
  modules: {},
});
