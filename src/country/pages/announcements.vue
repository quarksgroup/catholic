<template>
  <div class="announcements-dashboard ema-container">
    <div class="announcements-body">
      <header class="ema-header">
        <h5 class="title">All Announcements</h5>
        <b-field>
          <b-input
            :disabled="announcements.length < 1"
            placeholder="Search title..."
            type="search"
            icon-pack="fa"
            icon="search"
            v-model="searchedTitle"
          />
        </b-field>
        <button class="button is-primary br-1" @click="fetchData" :disabled="state.loading">Refresh</button>
      </header>
      <div class="page-loading" v-if="state.loading">
        <div class="loading-component loading-dark" />
        <p>Loading Announcements...</p>
      </div>
      <div class="ema-1c-grids" v-else-if="showAnnouncements">
        <announcement
          v-for="announcement in shownAnnouncements"
          :key="announcement.id"
          :announcement="announcement"
          @deleted="announcementDeleted"
          @edit="editAnnouncement"
        />
      </div>
      <div class="page-error" v-else-if="searchedTitle">
        <article>
          There are no announcements with the title
          <b class="has-text-weight-bold">{{searchedTitle}}</b>
        </article>
      </div>
      <div class="page-error" v-else-if="!state.loading">
        <p>There are no announcements available, For now!</p>
      </div>

      <!-- pagination -->

      <b-pagination
        :total="pagination.total || 0"
        :range-before="1"
        :range-after="1"
        :per-page="pagination.per_page || 0"
        :current.sync="currentPage"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        v-if="showPagination"
        class="my-3"
        @change="changedPage"
      ></b-pagination>
    </div>
    <update-announcement
      v-if="showUpdateForm"
      :announcement="objectToUpdate"
      @updated="announcementUpdated"
      @close="objectToUpdate=null"
    />
    <add-announcement v-else @created="announcementCreated" />
  </div>
</template>

<script>
import announcement from "../components/announcement.vue";
import addAnnouncement from "../components/add-announcement";
import updateAnnouncement from "../components/update-announcement";
export default {
  components: { addAnnouncement, announcement, updateAnnouncement },
  data() {
    return {
      state: { loading: true, error: "" },
      announcements: [],
      CancelAxios: null,
      objectToUpdate: null,
      searchedTitle: "",
      pagination: {},
      currentPage: 1,
    };
  },
  computed: {
    user() {
      return this.$store.getters.userDetails;
    },
    showAnnouncements() {
      if (this.shownAnnouncements.length > 0) return true;
      else return false;
    },
    showUpdateForm() {
      return this.objectToUpdate ? true : false;
    },
    shownAnnouncements() {
      return this.announcements.filter((announcement) =>
        announcement.title
          .toLowerCase()
          .includes(this.searchedTitle.toLowerCase())
      );
    },
    showPagination() {
      if (
        !this.state.loading &&
        this.pagination &&
        this.pagination.total &&
        this.pagination.per_page &&
        this.pagination.total > this.pagination.per_page
      )
        return true;
      return false;
    },
  },
  beforeMount() {
    this.fetchData(this.currentPage);
  },
  destroyed() {
    if (typeof this.CancelAxios == "function") this.CancelAxios();
  },
  methods: {
    fetchData(page) {
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      this.state.loading = true;
      this.axios
        .get(`announcement?page=${page ? page : 1}`, {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          }),
        })
        .then((res) => {
          this.$set(this, "announcements", res.data.data);
          this.$set(this, "pagination", res.data.meta);
          this.state.loading = false;
        })
        .catch((err) => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage || "");
        });
      this.CancelAxios = CANCEL_TOKEN;
    },
    announcementDeleted(deletedItem) {
      if (this.announcements.indexOf(deletedItem) !== -1)
        this.announcements.splice(this.announcements.indexOf(deletedItem), 1);
    },
    announcementCreated(createdItem) {
      this.announcements = [createdItem].concat(this.announcements);
    },
    announcementUpdated(updatedItem) {
      Object.keys(this.announcements).map(
        (key) =>
          this.announcements[key].id == updatedItem.id &&
          this.$set(this.announcements, key, updatedItem)
      );
    },
    editAnnouncement(itemToEdit) {
      this.objectToUpdate = itemToEdit;
    },
    clear() {
      this.state.loading = false;
      this.state.error = "";
    },
    changedPage(page) {
      this.fetchData(page);
    },
  },
};
</script>