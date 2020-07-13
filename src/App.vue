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
    }
    .loading-light {
      width: 4rem;
      height: 4rem;
      margin: 3rem;
    }
  }
}
</style>