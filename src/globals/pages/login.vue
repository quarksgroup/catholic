<template>
  <div class="login-page">
    <div class="img">
      <img src="@/assets/img/login_svg.svg" alt="Kominote Emmanuel" />
    </div>
    <div class="form">
      <form @submit.prevent="login">
        <h1>Login</h1>
        <div class="form-control">
          <label for="input">Email:</label>
          <input
            type="email"
            name="email"
            id="username"
            class="username"
            title="valid email address is required"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="Enter email address"
            required
          />
        </div>
        <div class="form-control">
          <label for="input">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            pattern=".{1,}"
            title="Password required"
            class="password"
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit" class="loginBtn">
          <p v-if="!state.loading">Login</p>
          <img v-else src="../../assets/img/white-spinner.svg" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      state: {
        loading: false
      }
    };
  },
  mounted() {
    this.state.loading = false;
  },
  methods: {
    login() {
      this.state.loading = true;
      setTimeout(() => {
        this.$router.push("/country");
        this.state.loading = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss">
</style>