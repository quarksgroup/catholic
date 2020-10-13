<template>
  <div id="testimonials-request-page">
    <header>
      <h2>Testimonial Requests</h2>
      <button class="button is-primary br-1" @click="fetchRequests">
        Refresh
      </button>
    </header>
    <div class="loading" v-if="state.loading">
      <i class="loading-dark" />
      <p>Loading Testimonial Requests</p>
    </div>
    <div class="content" v-else-if="show_requests">
      <testimonial-request
        v-for="(req, i) in shownRequests"
        :key="i"
        :request="req"
      />
    </div>
    <div class="error" v-else>
      <article>There are no Testimonial requests, for now!</article>
    </div>
  </div>
</template>

<script>
import TestimonialRequest from "../components/TestimonialRequest";
export default {
  name: "Testimonial-Requests-Page",
  components: {
    TestimonialRequest,
  },
  data() {
    return {
      TestimonialsRequestsData: [],
      state: { loading: true },
      CancelAxios: null,
    };
  },
  computed: {
    shownRequests() {
      return this.TestimonialsRequestsData;
    },
    show_requests() {
      return this.TestimonialsRequestsData.length > 0;
    },
  },
  destroyed() {
    this.cancelRequest();
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    fetchRequests() {
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      this.state.loading = true;
      this.axios
        .get("testimonial-request", {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          }),
        })
        .then((res) => {
          this.TestimonialsRequestsData = res.data.data;
          this.state.loading = false;
        })
        .catch((err) => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage || "");
        });
      this.CancelAxios = CANCEL_TOKEN;
    },
    cancelRequest() {
      if (typeof this.CancelAxios == "function") this.CancelAxios();
    },
  },
};
</script>

<style lang="scss">
#testimonials-request-page {
  min-width: 100%;
  min-height: 100%;

  & > header {
    width: 100%;
    min-width: 300px;
    align-items: flex-end;
    display: flex;
    padding: 0.25rem;
    align-items: center;
    border-bottom: 2px solid #999;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;

    h2 {
      font-size: 1.35rem;
      font-weight: bold;
    }
  }
  & > .content {
    min-width: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 290px));
    grid-gap: 1rem;
    padding: 0 1rem;
  }
  & > .loading {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;

    i {
      height: 2rem;
      width: 2rem;
      margin-bottom: 0.35rem;
    }
    p {
      font-weight: bold;
      font-size: 1.1rem;
      margin: 0.75rem;
    }
  }
  & > .error {
    display: flex;
    padding: 5rem;
    font-weight: bold;
    width: 100%;
    justify-content: center;
    font-size: 1.15rem;
    margin: auto;
    background: white;
    box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.23);
    border-radius: 3px;
  }
}
</style>