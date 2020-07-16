<template>
  <div class="announcements-dashboard ema-container">
    <div class="announcements-body">
      <header class="ema-header">
        <h5 class="title">Announcements in country</h5>
        <b-field>
          <b-input
            :disabled="announcements.length < 1"
            placeholder="Search title..."
            type="search"
            icon-pack="fa"
            icon="search"
          />
        </b-field>
        <button class="button is-primary br-1" @click="fetchData" :disabled="state.loading">Refresh</button>
      </header>
      <div class="page-loading" v-if="state.loading">
        <div class="loading-component loading-primary" />
        <p>Fetching...</p>
      </div>
      <div class="ema-1c-grids" v-if="showAnnouncements">
        <announcement
          v-for="announcement in announcements"
          :key="announcement.id"
          :announcement="announcement"
          @deleted="announcementDeleted"
        />
      </div>
      <div class="page-error" v-else-if="!state.loading">
        <p>There are no announcements available, For now!</p>
      </div>
    </div>
    <add-announcement @created="announcementCreated" />
  </div>
</template>

<script>
import announcement from "../components/announcement.vue";
import addAnnouncement from "../components/add-announcement";
export default {
  components: {
    addAnnouncement,
    announcement
  },
  data() {
    return {
      announcements: [],
      state: { loading: true, error: "" },
      CancelAxios: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.userDetails;
    },
    showAnnouncements() {
      if (this.announcements.length > 0) return true;
      else return false;
    }
  },
  beforeMount() {
    this.fetchData();
  },
  destroyed() {
    if (typeof this.CancelAxios == "function") this.CancelAxios();
  },
  methods: {
    fetchData() {
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      this.state.loading = true;
      this.axios
        .get("announcement", {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          })
        })
        .then(res => {
          this.announcements = res.data.data;
          console.log(this.announcements);
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage || "");
        });
      this.CancelAxios = CANCEL_TOKEN;
    },
    announcementDeleted(deletedItem) {
      Object.keys(this.announcements).map(
        key =>
          this.announcements[key].id == deletedItem.id &&
          this.announcements[key].body == deletedItem.body &&
          this.announcements[key].title == deletedItem.title &&
          this.$delete(this.announcements, key)
      );
      console.log(this.announcements);
      console.log(deletedItem);
    },
    announcementCreated(createdItem) {
      this.announcements = [createdItem].concat(this.announcements);
    },
    clear() {
      this.state.loading = false;
      this.state.error = "";
    }
  }
};
</script>