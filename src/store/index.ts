import { createStore } from "vuex";

export default createStore({
  state: {
    patternMode: "text",
  },
  getters: {
    userPatternMode: (state) => state.patternMode,
  },
  mutations: {
    changePattern: (state, pattern) => {
      state.patternMode = pattern;
      console.log(15, state.patternMode);
    },
  },
  actions: {},
  modules: {},
});
