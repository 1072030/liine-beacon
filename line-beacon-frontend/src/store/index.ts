import { createStore } from "vuex";

export default createStore({
  state: {
    patternMode: "text",
    beaconId: "32",
  },
  getters: {
    userPatternMode: (state) => state.patternMode,
    userBeaconMode: (state) => state.beaconId,
  },
  mutations: {
    //store commit 的function
    changePattern: (state, pattern) => {
      state.patternMode = pattern;
    },
    changeBeaconId: (state, beaconId) => {
      state.beaconId = beaconId;
    },
  },
  actions: {},
  modules: {},
});
