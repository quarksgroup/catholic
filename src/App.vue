<template>
  <div id="catholic-app">
    <div class="ema-app-loading" v-if="IsLoading">
      <h1>EmaRwanda</h1>
      <div class="loading-light"></div>
    </div>
    <router-view v-else />
  </div>
</template>
<script>
export default {
  name: "ema-app-entry-point",
  created() {
    this.$store.dispatch("STARTUP");
  },
  computed: {
    IsLoading() {
      return this.$store.getters.LoadingState;
    }
  }
};
</script>
<style lang="scss" >
#catholic-app {
  .ema-app-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: blueviolet;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 999;
    h1 {
      color: white;
      font-size: 2.5rem;
      animation: scale-animation normal;
      animation-duration: 1s;
    }
    .loading-light {
      width: 3rem;
      height: 3rem;
      margin: 3rem;
    }
  }
}
@keyframes scale-animation {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>