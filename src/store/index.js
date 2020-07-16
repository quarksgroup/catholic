import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const storeInstance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});

storeInstance.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token"))
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");
    return config;
  },

  (error) => Promise.reject(error)
);

storeInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    console.log(error);
    console.log(error.code);
    console.log(error.request);
    console.log(error.response);
    console.log(error.errorMessage);
    console.log(process.env.VUE_APP_BASEURL);
    try {
      // if (error.response && error.response.status === 401)
      //   //logout
      //   location.reload();
      // else
      if (error.response && error.response.status === 404)
        Vue.prototype.$toast.error(
          "can't find the resource you are searching for!"
        );
      else if (error.code === "ECONNABORTED")
        Vue.prototype.$toast.error("Your connection is weak! try again");
      else
        Vue.prototype.$toast.error(error.response.data.message || error || "");
    } catch {
      Vue.prototype.$toast.error(
        "something is wrong! try refreshing this page"
      );
    }
  }
);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    location: {
      countries: [],
      provinces: [],
      sectors: [],
      groups: [],
    },
    AppLoading: false,
  },
  mutations: {
    INITIALIZE: async (state) => {
      state.AppLoading = true;
      if (sessionStorage.getItem("token")) {
        let GetCountries = Vue.prototype.axios
          .get("country")
          .then((res) => res.data);
        let GetProvinces = Vue.prototype.axios
          .get("province")
          .then((res) => res.data);
        let GetSectors = Vue.prototype.axios
          .get("sector")
          .then((res) => res.data);
        let GetGroups = Vue.prototype.axios
          .get("groupe-de-priere")
          .then((res) => res.data);

        try {
          state.location.countries = await GetCountries;
          state.location.provinces = await GetProvinces;
          state.location.sectors = await GetSectors;
          state.location.groups = await GetGroups;
          state.AppLoading = false;
          console.log(state.location);
        } catch {
          state.AppLoading = false;
        }
      } else {
        state.AppLoading = false;
      }
    },
    MUTATEUSER: (state, new_user) => (state.user = new_user),
  },
  actions: {
    STARTUP: ({ commit }) => commit("INITIALIZE"),
    SETUSER: ({ commit }, user) => commit("MUTATEUSER", user),
  },
  getters: {
    userDetails: (state) => state.user,
    location: (state) => state.location,
    LoadingState: (state) => state.AppLoading,
  },
});
