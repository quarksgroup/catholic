<template>
  <div class="country-dashboard">
    <nav id="country-nav">
      <div class="logo">
        <!-- <img src="../../assets/img/logo.svg" /> -->
        EmaRWANDA
      </div>
      <div class="links">
        <ul>
          <router-link tag="li" :to="'/country'" :exact-active-class="'active'">
            <i class="fa fa-bell" />Announcements
          </router-link>
          <router-link tag="li" :to="'/country/testimonials'" :exact-active-class="'active'">
            <i class="fa fa-comment-dots" />Testimonials
          </router-link>
          <router-link tag="li" :to="'/country/studies'" :exact-active-class="'active'">
            <i class="fa fa-book" />Inyigisho
          </router-link>
          <router-link tag="li" :to="'/country/accounts'" :exact-active-class="'active'">
            <i class="fa fa-user-cog" />Accounts
          </router-link>
        </ul>
      </div>
      <div class="user-profile">
        <img src="../../assets/img/user_profile.svg" />
      </div>
      <div class="menu">
        <img src="../../assets/img/menu.svg" />
      </div>
    </nav>
    <div id="country-content">
      <transition name="route-fade" :duration="{enter:500,leave:0}">
        <router-view />
      </transition>
      <modal
        name="add-study"
        :width="500"
        :height="'auto'"
        :scrollable="true"
        :adaptive="true"
        :reset="true"
        :pivotY="0.5"
      >
        <add-study />
      </modal>
      <modal
        name="add-announcement"
        id="add-announcement"
        :width="500"
        :height="'auto'"
        :scrollable="true"
        :adaptive="true"
        :reset="true"
        :pivotY="0.5"
      >
        <add-announcement />
      </modal>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "add-study": () => import("../components/add-study"),
    "add-announcement": () => import("../components/add-announcement")
  }
};
</script>
<style lang="scss">
.route-fade-enter-active {
  animation: fade 0.5s normal;
}
.route-fade-leave,
.route-fade-leave-active {
  display: none;
}
@keyframes fade {
  0% {
    opacity: 0.1;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
</style>