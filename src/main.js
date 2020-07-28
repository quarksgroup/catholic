import Vue from "vue";
import axiosInstance from "./axios";
import Buefy from "buefy";
import App from "./App.vue";
import store from "./store";
import VueAxios from "vue-axios";
import "./registerServiceWorker";
import router from "./router.js";
import VModal from "vue-js-modal";
import "@/assets/styles/globals.scss";
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.min.css";
import ellipsis from "./globals/components/ellipsis.vue";

Vue.use(VModal, {
  dynamicDefault: {
    draggable: false,
    resizable: false,
    adaptive: true,
    draggable: false,
    scrollable: true,
    focusTrap: true,
    reset: true,
    clickToClose: false,
    height: "auto",
  },
});
Vue.use(Buefy, {
  defaultIconPack: "fa",
});
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
Vue.use(VueAxios, axiosInstance);

Vue.component("ellipsis", ellipsis);

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


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
