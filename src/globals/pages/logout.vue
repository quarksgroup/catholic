<template>
  <main class="logout-page">
    <div class="loading">
      <div class="loading-light"></div>
    </div>
    <h2>logging out</h2>
  </main>
</template>

<script>
export default {
  name: "logout-component",
  computed: {
    user() {
      return this.$store.getters.userDetails;
    },
    location() {
      return this.$store.getters.location;
    }
  },
  mounted() {
    this.$store.dispatch("LOGOUT").then(res => {
      this.$router.push("/");
    });
  }
};
</script>

<style lang="scss">
.logout-page {
  min-height: 100vh;
  width: 100%;
  background: blueviolet;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  user-select: none;

  .loading {
    width: 2rem;
    height: 2rem;
    div {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    font-size: 1.75rem;
    margin-top: 1.5rem;
  }
}
</style>