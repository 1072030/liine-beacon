import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {},
    patternMode: "bubble",
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
      state.userData = value;
    },
  },
  actions: {},
  modules: {},
});
