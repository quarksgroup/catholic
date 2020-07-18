<template>
  <div class="edit-testimonial">
    <header class="ema-add-header">
      <h5>Edit Testimonial</h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </header>
    <form @submit.prevent="editTestimonial">
      <div>
        <b-field label="Testimonial Title:">
          <b-input
            type="text"
            placeholder=" "
            validation-message=" "
            class="br-1 no-shadow"
            required
            v-model="title"
          />
        </b-field>

        <div class="control">
          <b-field label="Testimonial Description:">
            <b-input
              name="testimonial_description"
              id="testimonial-description"
              placeholder="Write testimonial description here..."
              required
              type="textarea"
              class="br-1 no-shadow"
              v-model="message"
              validation-message=" "
            />
          </b-field>
        </div>

        <b-field label="Testimonial Video URL:">
          <b-input
            type="url"
            placeholder=" "
            validation-message=" "
            class="br-1 no-shadow"
            required
            v-model="VideoURL"
          />
        </b-field>

        <b-field class="control ema-add-radios">
          <b-radio v-model="isPublic" :native-value="true">Public</b-radio>
          <b-radio v-model="isPublic" :native-value="false">Private</b-radio>
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
          <button class="button is-primary" type="submit">Edit</button>
        </div>
      </div>
      <div class="loading control" v-if="state.loading">
        <span @click="CancelRequestFunction()">&times;</span>
        <div class="loading-light"></div>
        <p>Editing testimonial...</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-testimonial-component",
  props: {
    testimonial: Object
  },
  data() {
    return {
      state: {
        loading: true
      },
      title: "",
      message: "",
      VideoURL: "",
      isPublic: false,
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
  beforeMount() {
    this.title = this.testimonial.title;
    this.message = this.testimonial.body;
    this.isPublic = this.testimonial.public;
    this.VideoURL = this.testimonial.VideoURL;
    this.country = this.testimonial.country
      ? {
          name: this.testimonial.country.name,
          id: this.testimonial.country.id
        }
      : this.default;
    this.province = this.testimonial.province
      ? {
          name: this.testimonial.province.name,
          id: this.testimonial.province.id
        }
      : this.default;
    this.sector = this.testimonial.sector
      ? {
          name: this.testimonial.sector.name,
          id: this.testimonial.sector.id
        }
      : this.default;
    this.group = this.testimonial["groupe_de_priere"]
      ? {
          name: this.testimonial["groupe_de_priere"].name,
          id: this.testimonial["groupe_de_priere"].id
        }
      : this.default;

    this.state.loading = false;
  },
  beforeDestroy() {
    this.CancelRequestFunction();
    this.$emit("close");
  },
  methods: {
    editTestimonial() {
      this.state.loading = true;
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      let reqData = {
        title: this.title,
        body: this.message,
        video_url: this.VideoURL,
        public: this.isPublic,
        country_id: this.country.id,
        province_id: this.province.id,
        sector_id: this.sector.id,
        group_id: this.group.id
      };
      Object.keys(reqData).map(
        key => reqData[key] == null && delete reqData[key]
      );
      this.axios
        .put(`testimonial/${this.testimonial.id}`, reqData, {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          })
        })
        .then(res => {
          console.log(res);
          this.state.loading = false;
          if (res.data.message) this.$toast.success(res.data.message);
          if (res.status == 201) this.$emit("updated", res.data.data);
          this.$emit("close");
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
    }
  }
};
</script>

<style lang="scss">
.edit-testimonial {
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
      background-color: rgba(0, 0, 0, 0.5);
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
    textarea {
      font-family: inherit;
      font-size: 0.85rem;
      color: inherit;
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
.edit-testimonial,
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