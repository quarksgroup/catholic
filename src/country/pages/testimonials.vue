<template>
  <div class="testimonial-dashboard">
    <div class="all-testimonials">
      <header>
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
        <button class="button is-primary" @click="refresh">Refresh</button>
      </header>
      <div class="body">
        <div class="page-loading" v-if="state.loading">
          <div class="loading-component loading-primary" />
          <p>Fetching...</p>
        </div>

        <div class="page-error" v-if="HideTestimonials">
          <p>There are no testimonials available, For now!</p>
        </div>
        <testimonial
          v-else
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
        />
      </div>
    </div>
    <add-testimonial />
  </div>
</template>

<script>
import testimonial from "../components/testimonial";
export default {
  components: {
    "add-testimonial": () => import("../components/add-testimonial"),
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
    HideTestimonials() {
      if (this.state.loading == true)
        return this.state.is_refreshing == true
          ? this.testimonials.length < 1
            ? true
            : false
          : false;
      else return this.testimonials.length < 1;
    }
  },
  destroyed() {
    this.state.loading = false;
    this.testimonials = [];
  },
  mounted() {
    this.loadData();
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
    refresh() {
      this.state.is_refreshing = true;
      this.loadData();
    }
  }
};
</script>

<style lang="scss">
.testimonial-dashboard {
  height: -webkit-fill-available;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 1rem;

  .all-testimonials {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 450px;
    & > header {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #999;
      align-items: center;
      padding-bottom: 0.3rem;
      flex-wrap: wrap;
      h5.title {
        font-size: 1.45rem;
        white-space: nowrap;
        margin-right: 0.5rem;
        margin-bottom: 0;
        overflow: hidden;
        width: auto;
        text-overflow: ellipsis;
        flex: 1;
      }
      & > .field {
        margin-bottom: 0;
        margin-right: 0.5rem;
        input {
          font-family: inherit;
        }
      }
    }
  }
}
</style>