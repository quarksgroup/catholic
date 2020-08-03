<template>
  <div class="edit-announcement">
    <header class="ema-add-header">
      <h5>Edit announcement</h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </header>
    <form @submit.prevent="editAnnouncement">
      <div>
        <b-field label="Announcement Title:">
          <b-input
            type="text"
            placeholder=" "
            validation-message=" "
            class="br-1 no-shadow"
            required
            v-model="title"
          />
        </b-field>

        <b-field label="Announcement Message:" class="control">
          <b-input
            name="announcement_message"
            id="announcement-message"
            placeholder="Write announcement here..."
            required
            type="textarea"
            class="br-1 no-shadow"
            v-model="message"
          />
        </b-field>

        <b-field class="control ema-add-radios">
          <b-radio v-model="isPublic" :native-value="true">Public</b-radio>
          <b-radio v-model="isPublic" :native-value="false">Private</b-radio>
        </b-field>

        <select-grids
          v-if="!isPublic"
          @setcountry="SetCountry"
          @setprovince="SetProvince"
          @setsector="SetSector"
          @setgroup="SetGroup"
        />

        <div class="control ema-btn">
          <button class="button is-primary" type="submit">Edit</button>
        </div>
      </div>
      <div class="loading control" v-if="state.loading">
        <span @click="CancelRequestFunction()">&times;</span>
        <div class="loading-light"></div>
        <p>Editing announcement...</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-announcement-component",
  props: {
    announcement: Object,
  },
  data() {
    return {
      state: {
        loading: true,
      },
      title: "",
      message: "",
      isPublic: false,
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
  beforeMount() {
    this.title = this.announcement.title;
    this.message = this.announcement.body;
    this.isPublic = this.announcement.public;
    this.country = this.announcement.country
      ? {
          name: this.announcement.country.name,
          id: this.announcement.country.id,
        }
      : this.default;
    this.province = this.announcement.province
      ? {
          name: this.announcement.province.name,
          id: this.announcement.province.id,
        }
      : this.default;
    this.sector = this.announcement.sector
      ? {
          name: this.announcement.sector.name,
          id: this.announcement.sector.id,
        }
      : this.default;
    this.group = this.announcement["groupe_de_priere"]
      ? {
          name: this.announcement["groupe_de_priere"].name,
          id: this.announcement["groupe_de_priere"].id,
        }
      : this.default;
    this.state.loading = false;
  },
  beforeDestroy() {
    this.CancelRequestFunction();
    this.$emit("close");
  },
  methods: {
    editAnnouncement() {
      this.state.loading = true;
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      let reqData = {
        title: this.title,
        body: this.message,
        public: this.isPublic,
        country_id: this.country,
        province_id: this.province,
        sector_id: this.sector,
        group_id: this.group,
      };
      Object.keys(reqData).map(
        (key) => reqData[key] == null && delete reqData[key]
      );
      this.axios
        .put(`announcement/${this.announcement.id}`, reqData, {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          }),
        })
        .then((res) => {
          this.state.loading = false;
          if (res.data.message) this.$toast.success(res.data.message);
          if (res.status == 200) this.$emit("updated", res.data.data);
          this.$emit("close");
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
      this.title = "";
      this.message = "";
      this.CancelRequest = null;
      this.isPublic = false;
      this.$emit("clear-selects");
    },
  },
};
</script>

<style lang="scss">
.edit-announcement {
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
.edit-announcement,
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