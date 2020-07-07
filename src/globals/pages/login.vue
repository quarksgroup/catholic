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
          <input
            trim
            required
            autofocus
            type="email"
            name="email"
            id="username"
            class="username"
            v-model="username"
            placeholder="Enter email address"
            title="valid email address is required"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
          <img v-if="state.loading" :src="img.spinner" />
          <p v-else>Login</p>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import spinner from "../../assets/img/white-spinner.svg";
import logo from "../../assets/img/login_svg.svg";
export default {
  name: "login",
  data() {
    return {
      state: {
        loading: false
      },
      img: {
        logo: logo,
        spinner: spinner
      },
      username: "",
      password: ""
    };
  },
  mounted() {
    this.state.loading = false;
  },
  methods: {
    login() {
      this.state.loading = true;
      this.axios.post("login", { username: this.username, password: "password" });
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