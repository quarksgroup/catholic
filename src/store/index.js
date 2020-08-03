import Vue from "vue";
import Vuex from "vuex";
import axiosInstance from "../axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    location: {
      countries: null,
      provinces: null,
      sectors: null,
      groups: null,
    },
    ActiveLocation: {},
    AppLoading: false,
  },
  mutations: {
    INITIALIZE: async (state) => {
      state.AppLoading = true;
      if (sessionStorage.getItem("token")) {
        let GetCountries = axiosInstance.get("country").then((res) => res.data);
        let GetProvinces = axiosInstance
          .get("province")
          .then((res) => res.data);
        let GetSectors = axiosInstance.get("sector").then((res) => res.data);
        let GetGroups = axiosInstance
          .get("groupe-de-priere")
          .then((res) => res.data);
        let GetUser = axiosInstance.get("user").then((res) => res.data.data);

        try {
          state.user = await GetUser;

          if (
            state.user &&
            state.user.role &&
            state.user.role.slug == "groupe_de_priere"
          ) {
            state.ActiveLocation = {
              country: state.user.belongs_to.country,
              province: state.user.belongs_to.province,
              sector: state.user.belongs_to.sector,
              group: state.user.belongs_to.group_de_priere,
            };
          } else {
            state.location.groups = await GetGroups;
          }

          if (
            state.user &&
            state.user.role &&
            state.user.role.slug == "sector"
          ) {
            state.ActiveLocation = {
              country: state.user.belongs_to.country,
              province: state.user.belongs_to.province,
              sector: state.user.belongs_to.sector,
            };
          } else {
            state.location.sectors = await GetSectors;
          }

          if (
            state.user &&
            state.user.role &&
            state.user.role.slug == "province"
          ) {
            state.ActiveLocation = {
              country: state.user.belongs_to.country,
              province: state.user.belongs_to.province,
            };
          } else {
            state.location.provinces = await GetProvinces;
          }

          if (
            state.user &&
            state.user.role &&
            state.user.role.slug == "country"
          ) {
            state.ActiveLocation = {
              country: state.user.belongs_to.country,
            };
          } else {
            state.location.countries = await GetCountries;
          }

          state.AppLoading = false;
        } catch {
          state.AppLoading = false;
        }
      } else {
        state.AppLoading = false;
      }
    },
    MUTATEUSER: (state, new_user) => (state.user = new_user),
    RESET: (state) => {
      return new Promise((resolve, reject) => {
        state.user = null;
        state.location.countries = null;
        state.location.provinces = null;
        state.location.sectors = null;
        state.location.groups = null;
        state.AppLoading = false;
        resolve();
      });
    },
  },
  actions: {
    STARTUP: ({ commit }) => commit("INITIALIZE"),
    SETUSER: ({ commit }, user) => commit("MUTATEUSER", user),
    LOGOUT: async ({ commit }) => {
      sessionStorage.clear();
      await commit("RESET");
    },
  },
  getters: {
    userDetails: (state) => state.user,
    location: (state) => state.location,
    LoadingState: (state) => state.AppLoading,
    ActiveLocation: (state) => state.ActiveLocation,
  },
});
