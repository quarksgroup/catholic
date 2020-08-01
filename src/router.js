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
        path: "",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/globals/pages/login"),
        meta: { guest: true },
      },
      {
        path: "logout",
        name: "Logout Page",
        component: () =>
          import(/*webpackChunkName:"logout"*/ "@/globals/pages/logout"),
        meta: { neutral: true },
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
      {
        path: "/profile",
        name: "Profile Page",
        component: () =>
          import(/*webpackChunkName:"country"*/ "@/country/pages/profile.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/testimonials-requests",
        name: "Testimonials Request Page",
        component: () =>
          import(
            /*webpackChunkName:"Testimonials-requests"*/ "@/globals/pages/testimonials-requests.vue"
          ),
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (sessionStorage.getItem("token")) next();
    else next({ path: "/logout" });
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (sessionStorage.getItem("token")) next({ path: "/country" });
    else next();
  } else if (to.matched.some((record) => record.meta.neutral)) {
    next();
  } else {
    next({ path: "/logout" });
  }
});

export default router;
