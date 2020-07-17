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

        <div class="select-grids">
          <b-field label="Country:">
            <b-select
              placeholder="select country..."
              class="br-1"
              v-model="country"
              validation-message=" "
              :disabled="countryOptions.length < 2"
            >
              <option
                :value="country"
                v-for="country in countryOptions"
                :key="country.id"
              >{{country.name}}</option>
            </b-select>
          </b-field>

          <b-field label="Province:">
            <b-select
              placeholder="select province..."
              class="br-1"
              v-model="province"
              validation-message=" "
              :disabled="provinceOptions.length < 2"
            >
              <option
                :value="province"
                v-for="province in provinceOptions"
                :key="province.id"
              >{{province.name}}</option>
            </b-select>
          </b-field>

          <b-field label="Sector:">
            <b-select
              placeholder="select sector..."
              class="br-1"
              v-model="sector"
              validation-message=" "
              :disabled="sectorOptions.length < 2"
            >
              <option
                :value="sector"
                v-for="sector in sectorOptions"
                :key="sector.id"
              >{{sector.name}}</option>
            </b-select>
          </b-field>

          <b-field label="Groupe de priere:">
            <b-select
              placeholder="select Gr.Priere..."
              class="br-1"
              v-model="group"
              validation-message=" "
              :disabled="groupOptions.length < 2"
            >
              <option :value="group" v-for="group in groupOptions" :key="group.id">{{group.name}}</option>
            </b-select>
          </b-field>
        </div>

        <div class="control ema-btn">
          <button class="button is-primary" type="submit">Add</button>
        </div>
      </div>
      <div class="loading control" v-if="state.loading">
        <span @click="CancelRequestFunction()">&times;</span>
        <div class="loading-light"></div>
        <p>creating user</p>
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
        loading: false
      },
      name: "",
      username: "",
      phone: "",
      country: { name: "all", id: null },
      province: { name: "all", id: null },
      sector: { name: "all", id: null },
      group: { name: "all", id: null },
      default: { name: "all", id: null },
      CancelRequest: null
    };
  },
  computed: {
    location() {
      return this.$store.getters.location;
    },
    countryOptions() {
      console.log(this.location);
      return [this.default, this.$countryOptions()].flat();
    },
    provinceOptions() {
      return [this.default, this.$provinceOptions(this.country)].flat();
    },
    sectorOptions() {
      return [this.default, this.$sectorOptions(this.province)].flat();
    },
    groupOptions() {
      return [this.default, this.$groupOptions(this.sector)].flat();
    }
  },
  watch: {
    country() {
      handler: {
        this.$set(this, "province", this.default);
      }
    },
    province() {
      handler: {
        this.$set(this, "sector", this.default);
      }
    },
    sector() {
      handler: {
        this.$set(this, "group", this.default);
      }
    }
  },
  mounted() {},
  beforeDestroy() {
    this.CancelRequestFunction();
  },
  methods: {
    addAccount() {
      this.state.loading = true;
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      let reqData = {
        name: this.name,
        username: this.username,
        phone: this.phone,
        country_id: this.country.id,
        province_id: this.province.id,
        sector_id: this.sector.id,
        group_id: this.group.id
      };
      Object.keys(reqData).map(
        key => reqData[key] == null && delete reqData[key]
      );
      this.axios
        .post("user", reqData, {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          })
        })
        .then(res => {
          console.log(res);
          this.state.loading = false;
          this.$toast.success(res.data.message);
          this.clear();
          this.$emit("created");
        })
        .catch(err => {
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
    clear() {
      this.name = "";
      this.username = "";
      this.phone = "";
      this.country = this.default;
      this.province = this.default;
      this.sector = this.default;
      this.group = this.default;
      this.CancelRequest = null;
    }
  }
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