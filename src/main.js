import Vue from "vue";
import App from "./App.vue";
import "@/assets/styles/globals.scss";
import "./registerServiceWorker";
import router from "./router.js";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VModal from "vue-js-modal";
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
Vue.use(VModal);
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
