<template>
  <div class="announcements-dashboard">
    <div class="announcements-body">
      <header>
        <h5>Announcements in country</h5>

        <b-button class="is-primary br-1" @click="$modal.show('add-announcement')">
          <i class="fa fa-plus" /> Add announcement
        </b-button>
      </header>
      <div class="page-loading" v-if="state.loading">
        <div class="loading-component loading-primary"></div>
        <p>Fetching...</p>
      </div>
      <announcement v-else-if="announcements.length > 0" v-for="i in 5" :key="i" />
      <div class="page-error" v-else>
        <p>There are no announcements, For now!</p>
      </div>
    </div>
  </div>
</template>

<script>
import announcement from "../components/announcement.vue";
export default {
  components: {
    "add-announcement": () => import("../components/add-announcement"),
    announcement
  },
  data() {
    return {
      announcements: [],
      state: { loading: true, error: "" }
    };
  },
  computed: {
    user() {
      return this.$store.getters.userDetails;
    }
  },
  beforeMount() {
    this.fetchData();
    console.log(this.user);
  },
  destroyed() {
    this.$delete(this.announcements);
  },
  methods: {
    fetchData() {
      this.state.loading = true;
      this.axios
        .get("/api/testimonial")
        .then(res => {
          console.log(res.data);
          this.testimonials = res.data;
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err) this.$toast.error(err.errorMessage || "");
        });
    },
    clear() {
      this.state.loading = false;
      this.state.error = "";
    }
  }
};
</script>

<style lang="scss">
.announcements-dashboard {
  .announcements-body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    justify-content: center;
    align-items: center;

    & > header {
      display: flex;
      padding: 0.25rem;
      grid-column: 1/-1;
      align-items: center;
      border-bottom: 2px solid #999;
      justify-content: space-between;
      flex-wrap: wrap;

      h5 {
        font-size: 1.35rem;
        font-weight: bold;
        width: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      button {
        margin-left: 1rem;
      }
    }
    .page-loading {
      grid-column: 1/-1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 200px;
      .loading-component {
        height: 50px;
        width: 50px;
      }
      p {
        margin-top: 1rem;
        font-weight: bold;
        font-size: 1rem;
      }
    }
    .page-error {
      grid-column: 1/-1;
      min-height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-weight: bold;
        font-size: 1rem;
        text-align: left;
      }
    }
  }
}
</style>