<template>
  <div class="login-page">
    <div class="img">
      <img :src="img.logo" alt />
    </div>
    <div class="form">
      <form @submit.prevent="login">
        <h1>Login</h1>
        <div class="form-control">
          <label for="input">Email:</label>
          <!-- Email pattern pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" -->
          <input
            trim
            required
            autofocus
            type="text"
            name="email"
            id="username"
            class="username"
            v-model="username"
            placeholder="Enter username"
            title="valid username is required"
          />
        </div>
        <div class="form-control">
          <label for="input">Password:</label>
          <input
            required
            id="password"
            name="password"
            type="password"
            pattern=".{1,}"
            class="password"
            v-model="password"
            title="Password required"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" class="loginBtn">
          <div class="loading flex-center" v-if="state.loading">
            <i class="loading-light" />
          </div>
          <p v-else>Login</p>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/img/login_svg.svg";
export default {
  name: "login",
  data() {
    return {
      state: {
        loading: false
      },
      img: {
        logo: logo
      },
      username: "",
      password: ""
    };
  },
  mounted() {
    this.state.loading = false;
    sessionStorage.clear();
  },
  methods: {
    login() {
      this.state.loading = true;
      const reqData = { username: this.username, password: this.password };
      this.axios
        .post("login", reqData)
        .then(res => {
          sessionStorage.setItem("token", res.data.token);
          this.$store.dispatch("SETUSER", res.data.user);
          this.$store.dispatch("STARTUP");
          this.$router.push("/country");
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err) this.$toast.error(err.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
</style>