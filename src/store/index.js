import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    MUTATEUSER: (state, new_user) => (state.user = new_user),
  },
  actions: {
    SETUSER: ({ commit }, user) => commit("MUTATEUSER", user),
  },
  getters: {
    userDetails: (state) => state.user,
  },
});
