<template>
  <div class="studies-dashboard ema-container">
    <div class="studies">
      <header class="ema-header">
        <h5>Inyigisho zose</h5>
        <b-field>
          <b-input
            :disabled="studies.length < 1"
            placeholder="Search title..."
            type="search"
            icon-pack="fa"
            icon="search"
          />
        </b-field>
        <button class="button is-primary br-1" @click="fetchData">Refresh</button>
      </header>
      <div class="page-loading" v-if="state.loading">
        <div class="loading-component loading-primary" />
        <p>Fetching studies...</p>
      </div>
      <div class="ema-grids" v-if="showStudies">
        <study v-for="study in studies" :key="study.id" :study="study" />
      </div>
      <div class="page-error" v-else-if="!state.loading">
        <p>There are no Studies available, For now!</p>
      </div>
    </div>
    <add-study />
  </div>
</template>

<script>
import study from "../components/study";
import addStudy from "../components/add-study.vue";
export default {
  name: "study-component",
  components: { study, addStudy },
  data() {
    return {
      state: { loading: true, is_refreshing: false },
      studies: []
    };
  },
  computed: {
    showStudies() {
      if (this.studies.length > 0) return true;
      else return false;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.state.loading = true;
      this.axios
        .get("inyigisho")
        .then(res => {
          this.studies = res.data.data;
          console.log(this.studies);
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err) this.$toast.error(err.errorMessage || "");
        });
    }
  }
};
</script>

<style lang="scss">
.studies-dashboard {
  .studies {
  }
}
</style>