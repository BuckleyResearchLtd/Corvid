export default {
  state: {
    host: false,
  },
  mutations: {
    setHost(state, value) {
      console.log("setHost", value);
      state.host = value;
    },
  },
  actions: {
  },
  getters: {
    host: state => state.host,
  },
};