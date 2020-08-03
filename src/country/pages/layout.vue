<template>
  <div class="country-dashboard">
    <navigation />
    <div id="country-content">
      <transition name="route-fade" :duration="{enter:500,leave:0}">
        <router-view />
      </transition>
      <read-more />
    </div>
  </div>
</template>

<script>
import navigation from "../components/navigation";
export default {
  components: {
    navigation,
    "read-more": () => import("../../globals/components/ReadMore"),
  },
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