<template>
  <div class="add-announcement">
    <header class="ema-add-header">
      <h5>Add Announcement</h5>
    </header>
    <form @submit.prevent="createAnnouncement" class="body">
      <div class="control">
        <b-field label="Announcement:">
          <textarea
            name="announcement_message"
            id="announcement-message"
            rows="1"
            cols="1"
            placeholder="Write announcement here..."
            required
          />
        </b-field>
      </div>
      <div class="select-grids">
        <b-field label="Country:">
          <b-select
            placeholder="select country..."
            class="br-1"
            required
            v-model="country"
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
            required
            v-model="province"
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
            required
            v-model="sector"
            :disabled="sectorOptions.length < 2"
          >
            <option :value="sector" v-for="sector in sectorOptions" :key="sector.id">{{sector.name}}</option>
          </b-select>
        </b-field>
        <b-field label="Groupe de priere:">
          <b-select
            placeholder="select Gr.Priere..."
            class="br-1"
            required
            v-model="group"
            :disabled="groupOptions.length < 2"
          >
            <option :value="group" v-for="group in groupOptions" :key="group.id">{{group.name}}</option>
          </b-select>
        </b-field>
      </div>
      <div class="control ema-btn">
        <button type="submit " class="br-1 button is-primary">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: { loading: false, error: null },
      options: ["Country", "Diocese", "paroisse"],
      title: "",
      message: "",
      country: { name: "all", id: null },
      province: { name: "all", id: null },
      sector: { name: "all", id: null },
      group: { name: "all", id: null },
      default: { name: "all", id: null }
    };
  },
  computed: {
    location() {
      return this.$store.getters.location;
    },
    countryOptions() {
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
  methods: {
    createAnnouncement() {
      this.state.loading = true;
      const reqData = {
        title: this.title,
        body: this.message,
        country_id: this.country.id,
        province_id: this.province.id,
        sector_id: this.sector.id,
        groupe_de_priere_id: this.group.id
      };
      this.axios
        .post("announcement", reqData)
        .then(res => {
          console.log(res.data);
          this.clear();
        })
        .catch(err => {
          this.state.loading = false;
          if (err) this.$toast(err.errorMessage || "");
        });
    },
    clear() {
      this.title = "";
      this.message = "";
      this.country = this.default;
      this.province = this.default;
      this.sector = this.default;
      this.group = this.default;
      this.state.loading = false;
      this.state.error = null;
    }
  }
};
</script>

<style lang="scss">
.add-announcement {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.25);
  border-radius: 7px;
  width: 100%;
  min-width: 370px;
  height: fit-content;

  form.body {
    padding: 1rem;
    textarea::placeholder,
    .select.is-empty select {
      font-size: 15px;
    }

    label {
      margin-bottom: 3px;
      font-size: 15.5px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    textarea {
      width: 100% !important;
      padding: 0.5rem;
      min-height: 200px;
      max-height: 200px;
    }
    select,
    textarea {
      border-color: #ccc;
      font-family: inherit;
      font-size: 15px;
      width: 100%;
      border-radius: 2px;
    }
  }
}
</style>