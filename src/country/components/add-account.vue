<template>
  <div class="add-account">
    <header class="ema-add-header">
      <h5>Add an account</h5>
    </header>
    <form @submit.prevent="addAccount">
      <div>
        <b-field label="Names:">
          <b-input
            type="text"
            placeholder="Enter names..."
            validation-message=" "
            class="br-1 no-shadow"
            required
            v-model="name"
          />
        </b-field>

        <b-field label="username:">
          <b-input
            type="text"
            placeholder="Enter username..."
            validation-message=" "
            class="br-1 no-shadow"
            required
            v-model="username"
          />
        </b-field>

        <b-field label="Phone number:">
          <b-input
            type="number"
            placeholder="Enter phone number..."
            class="br-1 no-shadow"
            validation-message=" "
            required
            v-model="phone"
          />
        </b-field>

        <b-field label="Email:">
          <b-input
            type="text"
            placeholder="Enter email..."
            validation-message=" "
            class="br-1 no-shadow"
            required
            v-model="email"
          />
        </b-field>

        <select-grids
          @setcountry="SetCountry"
          @setprovince="SetProvince"
          @setsector="SetSector"
          @setgroup="SetGroup"
        />

        <div class="control ema-btn">
          <button class="button is-primary" type="submit">create account</button>
        </div>
      </div>
      <div class="loading control" v-if="state.loading">
        <span @click="CancelRequestFunction()">&times;</span>
        <div class="loading-light"></div>
        <p>creating Account</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "add-account-component",
  data() {
    return {
      state: {
        loading: false,
      },
      name: "",
      username: "",
      phone: "",
      email: "",
      country: { name: "all", id: null },
      province: { name: "all", id: null },
      sector: { name: "all", id: null },
      group: { name: "all", id: null },
      default: { name: "all", id: null },
      CancelRequest: null,
    };
  },
  computed: {
    location() {
      return this.$store.getters.location;
    },
    ActiveLocation() {
      return this.$store.getters.ActiveLocation;
    },
    showCountry() {
      if (this.ActiveLocation.country)
        this.country = this.ActiveLocation.country;
      return this.ActiveLocation.country ? false : true;
    },
    showProvince() {
      if (this.ActiveLocation.province)
        this.province = this.ActiveLocation.province;
      return this.ActiveLocation.province ? false : true;
    },
    showSector() {
      if (this.ActiveLocation.sector) this.sector = this.ActiveLocation.sector;
      return this.ActiveLocation.sector ? false : true;
    },
    showGroup() {
      if (this.ActiveLocation.group) this.group = this.ActiveLocation.group;
      return this.ActiveLocation.group ? false : true;
    },
  },
  beforeDestroy() {
    this.CancelRequestFunction();
  },
  methods: {
    addAccount() {
      // console.log(this.country);
      // console.log(this.province);
      // console.log(this.sector);
      // console.log(this.group);
      // return;
      this.state.loading = true;
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      let reqData = {
        name: this.name,
        username: this.username,
        phone: this.phone,
        email: this.email,
        country_id: this.country,
        province_id: this.province,
        sector_id: this.sector,
        group_id: this.group,
      };
      Object.keys(reqData).map(
        (key) => reqData[key] == null && delete reqData[key]
      );
      this.axios
        .post("user", reqData, {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          }),
        })
        .then((res) => {
          this.state.loading = false;
          if (res.data.message) this.$toast.success(res.data.message);
          if (res.status == 201) this.$emit("created");
          this.clear();
        })
        .catch((err) => {
          this.state.loading = false;
          console.log(err);
          if (err.errorMessage) this.$toast.error(err.errorMessage);
        });
      this.CancelRequest = CANCEL_TOKEN;
    },
    CancelRequestFunction() {
      if (typeof this.CancelRequest == "function") this.CancelRequest();
      this.state.loading = false;
    },
    SetCountry(country) {
      this.$set(this, "country", country);
    },
    SetProvince(province) {
      this.$set(this, "province", province);
    },
    SetSector(sector) {
      this.$set(this, "sector", sector);
    },
    SetGroup(group) {
      this.$set(this, "group", group);
    },
    clear() {
      this.name = "";
      this.username = "";
      this.phone = "";
      this.email = ''
      this.CancelRequest = null;
      this.$emit("clear-selects");
    },
  },
};
</script>

<style lang="scss">
.add-account {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.25);
  border-radius: 7px;
  width: 100%;
  min-width: 370px;
  height: fit-content;
  overflow-y: auto;

  header {
    height: 40px;
  }
  form {
    padding: 0.5rem 1rem 1.5rem;
    min-height: calc(100% - 40px);
    overflow-y: auto;
    position: relative;

    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.75);
      animation: opacity-animation 0.2s;
      div {
        width: 2rem;
        height: 2rem;
      }
      p {
        font-size: 1.15rem;
        color: white;
        margin-top: 1rem;
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.75rem;
        color: white;
        margin: 0.5rem 0.75rem;
        cursor: pointer;
      }
    }
    .select,
    .select select {
      width: 100%;
    }
    .label {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:not(:last-child) {
        margin-bottom: 0.25em;
      }
    }

    input::placeholder,
    .select.is-empty select {
      color: #9e9c9c !important;
      font-size: 15px;
    }
    .column {
      margin-bottom: 0 !important;
    }
  }
}
.add-account,
form {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #777777;
    outline: 1px solid slategrey;
    border-radius: 2px;
  }
}
@keyframes opacity-animation {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>