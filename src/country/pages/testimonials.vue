<template>
  <div class="testimonial-dashboard">
    <div class="all-testimonials">
      <div class="control">
        <header class="title is-6">All Testimonials</header>
        <b-field v-if="testimonials.length > 0">
          <b-input placeholder="Search title..." type="search" icon-pack="fa" icon="search"></b-input>
        </b-field>
      </div>
      <div class="body">
        <div class="testimonial" v-for="testimonial in testimonials" :key="testimonial.id">
          <header>{{testimonial.title}}</header>
          <p class="description">{{testimonial.message}}</p>
          <b-button class="is-primary is-small">Read More...</b-button>
        </div>
        <div class="is-empty no-select" v-if="!state.loading && testimonials.length < 0">
          <i class="fa fa-attention" />
          <p>No Testimonials available to display{{testimonials.length}}</p>
        </div>
        <loader v-if="state.loading" />
      </div>
    </div>
    <add-testimonial />
  </div>
</template>

<script>
export default {
  components: {
    loader: () => import("@/globals/components/loading.vue"),
    "add-testimonial": () => import("../components/add-testimonial")
  },
  data() {
    return {
      options: ["country", "Diocese", "parish"],
      state: {
        loading: false
      },
      testimonials: []
    };
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
    width: fit-content;
    min-width: 450px;
    .control {
      display: flex;
      justify-content: space-between;
      header {
        font-size: 1.7rem;
        white-space: nowrap;
        margin-right: 0.5rem;
      }
      input {
        font-family: inherit;
      }
    }
    .body {
      .testimonial {
        width: fit-content;
        background: white;
        padding: 1rem;
        border-radius: 3px;
        box-shadow: 0 1px 4px 0 rgba(32, 33, 36, 0.28);
        margin: 1rem 0;
        display: flex;
        flex-direction: column;

        header {
          font-size: 1.2rem;
          font-weight: bold;
          text-transform: capitalize;
          margin-bottom: 0.5rem;
        }

        .description {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          line-height: 135%;
          font-size: 15px;
          opacity: 0.9;
        }
        button {
          width: fit-content;
          margin-left: auto;
          margin-top: 1rem;
        }
      }
    }
  }
}
</style>