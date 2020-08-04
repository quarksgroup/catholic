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
import SelectGrids from "./globals/components/select-grids.vue";

Vue.use(VModal, {
  dynamicDefault: {
    draggable: false,
    resizable: false,
    adaptive: true,
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
Vue.component("select-grids", SelectGrids);

Vue.prototype.$countryOptions = () => {
  let location = store.getters.location;
  return location.countries || [];
};
Vue.prototype.$provinceOptions = (countryID) => {
  let location = store.getters.location;
  if (countryID)
    return (
      location.provinces.filter(
        (province) => province.country.id == countryID
      ) || []
    );
  else return [];
};
Vue.prototype.$sectorOptions = (provinceID) => {
  let location = store.getters.location;
  if (provinceID)
    return (
      location.sectors.filter((sector) => sector.province.id == provinceID) ||
      []
    );
  else return [];
};
Vue.prototype.$groupOptions = (sectorID) => {
  let location = store.getters.location;
  if (sectorID)
    return location.groups.filter((group) => group.sector.id == sectorID) || [];
  else return [];
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
