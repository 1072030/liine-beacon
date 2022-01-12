import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {},
    patternMode: "bubble",
    beaconId: "",
    companyInfo: {},
  },
  getters: {
    userData: (state) => state.userData,
    userPatternMode: (state) => state.patternMode,
    userBeaconMode: (state) => state.beaconId,
    companyInfo: (state) => state.companyInfo,
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
    SET_COMPANYINFO: (state, value) => {
      state.companyInfo = value;
    },
  },
  actions: {},
  modules: {},
});
