<template>
  <div class="testimonial-dashboard">
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

        <div class="testionials" v-if="showTestimonials">
          <testimonial
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :testimonial="testimonial"
          />
        </div>
        <div class="page-error" v-else-if="!state.loading">
          <p>There are no testimonials available, For now!</p>
        </div>
      </div>
    </div>
    <add-testimonial />
  </div>
</template>

<script>
import testimonial from "../components/testimonial";
import addTestimonial from "../components/add-testimonial";
export default {
  components: {
    addTestimonial,
    testimonial
  },
  data() {
    return {
      options: ["country", "Diocese", "parish"],
      state: {
        loading: true,
        is_refreshing: false
      },
      testimonials: []
    };
  },
  computed: {
    showTestimonials() {
      if (this.testimonials.length > 0) return true;
      else return false;
    }
  },
  destroyed() {
    this.state.loading = false;
    this.testimonials = [];
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    loadData() {
      this.state.loading = true;
      this.getData().then(res => {
        this.testimonials = res;
        this.state.loading = false;
        this.state.is_refreshing = false;
      });
    },

    getData() {
      const data = require("../../../data/testimonials.json");
      return new Promise(resolve => {
        const timeout = setTimeout(() => {
          resolve(data);
          clearTimeout(timeout);
        }, 1000);
      });
    },
    fetchData() {
      this.state.loading = true;
      this.axios
        .get("testimonial")
        .then(res => {
          this.testimonials = res.data.data;
          console.log(this.testimonials);
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err) this.$toast.error(err.errorMessage || "");
        });
    },
    refresh() {
      this.state.is_refreshing = true;
      this.fetchData();
    }
  }
};
</script>

<style lang="scss">
.testimonial-dashboard {
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 1rem;
}
</style>