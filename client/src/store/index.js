import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import host from '@/store/host';
import alerts from '@/store/alerts';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  modules: {
    alerts,
    host,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  plugins: [vuexLocal.plugin]
});
