import Vue from "vue";
import VueRouter from "vue-router";
import guest from "@/globals/pages/guest";
import country from "@/country/pages/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: guest,
    children: [
      {
        path: "/",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/globals/pages/login"),
        meta: { guest: true },
      },
    ],
  },
  {
    path: "/country",
    component: country,
    children: [
      {
        path: "",
        name: "Announcements",
        component: () =>
          import(
            /* webpackChunkName: "country" */ "@/country/pages/announcements.vue"
          ),
        meta: { requireAuth: true },
      },
      {
        path: "testimonials",
        name: "Testimonials",
        component: () =>
          import(
            /* webpackChunkName: "country" */ "@/country/pages/testimonials.vue"
          ),
        meta: { requireAuth: true },
      },
      {
        path: "accounts",
        name: "Accounts Managment",
        component: () =>
          import(
            /* webpackChunkName: "country" */ "@/country/pages/accounts.vue"
          ),
        meta: { requireAuth: true },
      },
      {
        path: "studies",
        name: "Bible study",
        component: () =>
          import(/*webpackChunkName:"country"*/ "@/country/pages/studies.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
