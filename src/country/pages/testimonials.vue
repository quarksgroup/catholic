<template>
  <div class="testimonial-dashboard ema-container">
    <div class="all-testimonials">
      <header class="ema-header">
        <h5 class="title">All Testimonials</h5>
        <b-field>
          <b-input
            :disabled="testimonials.length < 1"
            placeholder="Search title..."
            type="search"
            icon-pack="fa"
            icon="search"
            v-model="searchedTitle"
          />
        </b-field>
        <button class="button is-primary br-1" @click="refresh">Refresh</button>
      </header>
      <div class="body">
        <div class="page-loading" v-if="state.loading">
          <div class="loading-component loading-dark" />
          <p>Fetching...</p>
        </div>

        <div class="ema-grids" v-else-if="showTestimonials">
          <video-card
            v-for="testimonial in shownTestimonials"
            :key="testimonial.id"
            :video="testimonial"
            from="testimonial"
            @deleted="testimonialDeleted"
            @edit="editTestimonial"
          />
        </div>
        <div class="page-error" v-else-if="searchedTitle">
          <article>
            There are no testimonials with the title
            <b
              class="has-text-weight-bold"
            >{{searchedTitle}}</b>
          </article>
        </div>
        <div class="page-error" v-else-if="!state.loading">
          <p>There are no testimonials available, For now!</p>
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
    </div>
    <update-testimonial
      v-if="showUpdateForm"
      :testimonial="objectToUpdate"
      @updated="testimonialUpdated"
      @close="objectToUpdate=null"
    />
    <add-testimonial v-else @created="testimonialCreated" />
  </div>
</template>

<script>
import videoCard from "../components/Video-card";
import addTestimonial from "../components/add-testimonial";
import updateTestimonial from "../components/update-testimonial";
export default {
  components: { addTestimonial, updateTestimonial, videoCard },
  data() {
    return {
      state: { loading: true, is_refreshing: false },
      testimonials: [],
      CancelAxios: null,
      objectToUpdate: null,
      searchedTitle: "",
      pagination: {},
      currentPage: 1,
    };
  },
  computed: {
    showTestimonials() {
      if (this.shownTestimonials.length > 0) return true;
      else return false;
    },
    showUpdateForm() {
      return this.objectToUpdate != null ? true : false;
    },
    shownTestimonials() {
      return this.testimonials.filter((testimonial) =>
        testimonial.title
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
  destroyed() {
    if (typeof this.CancelAxios == "function") this.CancelAxios();
  },
  beforeMount() {
    this.fetchData(this.currentPage);
  },
  methods: {
    fetchData(page) {
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      this.state.loading = true;
      this.axios
        .get(`testimonial?page=${page ? page : 1}`, {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          }),
        })
        .then((res) => {
          this.$set(this, "testimonials", res.data.data);
          this.$set(this, "pagination", res.data.meta);
          this.state.loading = false;
        })
        .catch((err) => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage || "");
        });
      this.CancelAxios = CANCEL_TOKEN;
    },
    refresh() {
      this.state.is_refreshing = true;
      this.fetchData(this.currentPage);
    },
    testimonialCreated(createdItem) {
      this.testimonials = [createdItem].concat(this.testimonials);
    },
    testimonialDeleted(deletedItem) {
      if (this.testimonials.indexOf(deletedItem) !== -1)
        this.testimonials.splice(this.testimonials.indexOf(deletedItem), 1);
    },
    testimonialUpdated(updatedItem) {
      Object.keys(this.testimonials).map(
        (key) =>
          this.testimonials[key].id == updatedItem.id &&
          this.$set(this.testimonials, key, updatedItem)
      );
    },
    async editTestimonial(itemToEdit) {
      if (this.showUpdateForm) await this.$set(this, "objectToUpdate", null);
      this.$set(this, "objectToUpdate", itemToEdit);
    },
    changedPage(page) {
      this.fetchData(page);
    },
  },
};
</script>
