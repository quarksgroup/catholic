import Vue from "vue";
import axios from "axios";
import Buefy from "buefy";
import App from "./App.vue";
import store from "./store";
import "buefy/dist/buefy.css";
import VueAxios from "vue-axios";
import "./registerServiceWorker";
import router from "./router.js";
import VModal from "vue-js-modal";
import "@/assets/styles/globals.scss";
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.min.css";

Vue.use(VModal);
Vue.use(Buefy);
Vue.use(VueIziToast, {
  timeout: 7000,
  transitionIn: "flipInX",
  transitionOut: "flipOutX",
  closeOnClick: true,
  progressBar: false,
  position: "topCenter",
  backgroundColor: "#fff",
  titleColor: "#8a2be2",
  messageColor: "#8a2be2",
  iconColor: "#8a2be2",
});

// axios configs
// -----------------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token"))
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");
    return config;
  },

  (error) => {
    // if (navigator.onLine === false)
    //   Vue.prototype.$snotify.error("Please check internet connectivity!");
    console.log("from MAIN/request: error.code" + error.code);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
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
        return Promise.reject({
          errorMessage: "can't find the resource you are searching for!",
        });
      else if (error.code === "ECONNABORTED")
        return Promise.reject({
          errorMessage: "Your connection is weak! try again",
        });
      else if (axios.isCancel(error)) return;
      else
        return Promise.reject({
          errorMessage: error.response.data.message || error,
        });
    } catch {
      return Promise.reject({
        errorMessage: "something is wrong! try refreshing this page",
      });
    }
  }
);
Vue.use(VueAxios, axiosInstance);

Vue.prototype.$countryOptions = () => {
  let location = store.getters.location;
  return location.countries || [];
};
Vue.prototype.$provinceOptions = (country) => {
  let location = store.getters.location;
  if (country && country.id)
    return (
      location.provinces.filter(
        (province) =>
          province.country.name == country.name &&
          province.country.id == country.id
      ) || []
    );
  else return [];
};
Vue.prototype.$sectorOptions = (province) => {
  let location = store.getters.location;
  if (province && province.id)
    return (
      location.sectors.filter(
        (sector) =>
          sector.province.name == province.name &&
          sector.province.id == province.id
      ) || []
    );
  else return [];
};
Vue.prototype.$groupOptions = (sector) => {
  let location = store.getters.location;
  if (sector && sector.id)
    return (
      location.groups.filter(
        (group) =>
          group.sector.name == sector.name && group.sector.id == sector.id
      ) || []
    );
  else return [];
};
Vue.prototype.$CancelToken = () => axios.CancelToken;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
