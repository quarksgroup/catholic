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
          />
        </b-field>
        <button class="button is-primary br-1" @click="refresh">Refresh</button>
      </header>
      <div class="body">
        <div class="page-loading" v-if="state.loading">
          <div class="loading-component loading-primary" />
          <p>Fetching...</p>
        </div>

        <div class="ema-grids" v-if="showTestimonials">
          <video-card
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :video="testimonial"
            from="testimonial"
            @deleted="testimonialDeleted"
            @edit="editTestimonial"
          />
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
  components: {
    addTestimonial,
    updateTestimonial,
    videoCard
  },
  data() {
    return {
      options: ["country", "Diocese", "parish"],
      state: {
        loading: true,
        is_refreshing: false
      },
      testimonials: [],
      CancelAxios: null,
      objectToUpdate: null
    };
  },
  computed: {
    showTestimonials() {
      if (this.testimonials.length > 0) return true;
      else return false;
    },
    showUpdateForm() {
      return this.objectToUpdate ? true : false;
    }
  },
  destroyed() {
    if (typeof this.CancelAxios == "function") this.CancelAxios();
  },
  mounted() {
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
          })
        })
        .then(res => {
          this.testimonials = res.data.data;
          console.log(this.testimonials);
          this.state.loading = false;
        })
        .catch(err => {
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
      Object.keys(this.testimonials).map(
        key =>
          this.testimonials[key].id == deletedItem.id &&
          this.testimonials[key].body == deletedItem.body &&
          this.testimonials[key].title == deletedItem.title &&
          this.$delete(this.testimonials, key)
      );
    },
    testimonialUpdated(updatedItem) {
      Object.keys(this.testimonials).map(
        item =>
          this.testimonials[key].id == updatedItem.id &&
          this.$set(this.testimonials, key, updatedItem)
      );
    },
    editTestimonial(itemToEdit) {
      this.objectToUpdate = itemToEdit;
    }
  }
};
</script>
