<template>
  <div id="catholic-app">
    <div class="ema-app-loading" v-if="state.refreshing">
      <h1>EmaRwanda</h1>
      <div class="loading-light" v-if="IsLoading"></div>

      <div class="error" v-else>
        <p>The Application initialization Failed!</p>
        <button class="outline-button" @click="refresh">Refresh</button>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>
<script>
export default {
  name: "ema-app-entry-point",
  data() {
    return {
      state: { refreshing: false, showError: false },
    };
  },
  created() {
    this.$store.dispatch("STARTUP");
  },
  computed: {
    IsLoading() {
      return this.$store.getters.LoadingState;
    },
    location() {
      return this.$store.getters.location;
    },
    user() {
      return this.$store.getters.userDetails;
    },
    ActiveLocation() {
      return this.$store.getters.ActiveLocation;
    },
    InitializationIncomplete() {
      let { country, province, sector, group } = this.ActiveLocation;
      if (this.user.role.slug == "group_de_priere") {
        return (
          Object.keys(this.ActiveLocation).filter(
            (key) => this.ActiveLocation[key] == null
          ).length > 0
        );
      }
      if (this.user.role.slug == "sector") {
        if (
          country != null &&
          province != null &&
          sector != null &&
          this.location.groups != null
        )
          return false;
        else return true;
      }
      if (this.user.role.slug == "province") {
        if (
          country != null &&
          province != null &&
          this.location.sectors != null &&
          this.location.groups != null
        )
          return false;
        else return true;
      }
      if (this.user.role.slug == "country") {
        if (
          country != null &&
          this.location.provinces != null &&
          this.location.sectors != null &&
          this.location.groups != null
        )
          return false;
        else return true;
      }
    },
  },
  watch: {
    IsLoading() {
      handler: {
        if (this.IsLoading == true) {
          this.state.refreshing = true;
          this.state.showError = false;
        } else {
          if (this.InitializationIncomplete == true)
            this.state.showError = true;
          else {
            this.state.showError = false;
            this.state.refreshing = false;
          }
        }
      }
    },
  },
  mounted() {},
  methods: {
    refresh() {
      this.state.refreshing = true;
      this.$store.dispatch("STARTUP");
    },
  },
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
      margin-bottom: 3rem;
    }
    .loading-light {
      width: 3rem;
      height: 3rem;
      margin: 3rem;
      margin-top: 0;
    }

    .error {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 1.15rem;
        background: #ff6f56c7;
        color: white;
        padding: 0.5rem 1.75rem;
        border-radius: 3px;
        border: none;
        margin: 0.5rem 0;
        letter-spacing: 1px;
      }

      button {
        cursor: pointer;
        color: #fff;
        border: 1px solid #fff;
        background-color: transparent;
        border-radius: 3px;
        height: 40px;
        min-width: 120px;
        font-size: 1.1rem;
        letter-spacing: 1px;
        margin-top: 1rem;
        transition: 0.2s linear;

        &:hover {
          color: blueviolet;
          border: 1px solid blueviolet;
          background-color: ghostwhite;
        }
        &:focus {
          outline: none;
        }
        &:active {
          transform: translateY(4px);
        }
      }
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