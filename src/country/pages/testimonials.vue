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

        <div class="ema-grids" v-if="showTestimonials">
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
    };
  },
  computed: {
    showTestimonials() {
      if (this.shownTestimonials.length > 0) return true;
      else return false;
    },
    showUpdateForm() {
      return this.objectToUpdate ? true : false;
    },
    shownTestimonials() {
      return this.testimonials.filter((testimonial) =>
        testimonial.title
          .toLowerCase()
          .includes(this.searchedTitle.toLowerCase())
      );
    },
  },
  destroyed() {
    if (typeof this.CancelAxios == "function") this.CancelAxios();
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      this.state.loading = true;
      this.axios
        .get("testimonial", {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          }),
        })
        .then((res) => {
          this.testimonials = res.data.data;
          console.log(this.testimonials);
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
      this.fetchData();
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
    editTestimonial(itemToEdit) {
      this.objectToUpdate = itemToEdit;
    },
  },
};
</script>
