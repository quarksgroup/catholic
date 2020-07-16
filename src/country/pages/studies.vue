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
        <video-card
          v-for="study in studies"
          :key="study.id"
          :video="study"
          from="inyigisho"
          @deleted="studyDeleted"
        />
      </div>
      <div class="page-error" v-else-if="!state.loading">
        <p>There are no Studies available, For now!</p>
      </div>
    </div>
    <add-study @created="studyCreated" />
  </div>
</template>

<script>
import videoCard from "../components/Video-card";
import addStudy from "../components/add-study.vue";
export default {
  name: "study-component",
  components: { videoCard, addStudy },
  data() {
    return {
      state: { loading: true, is_refreshing: false },
      studies: [],
      CancelAxios: null
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
  destroyed() {
    if (typeof this.CancelAxios == "function") this.CancelAxios();
  },
  methods: {
    async fetchData() {
      const CancelToken = this.$CancelToken();
      let CANCEL_TOKEN;
      this.state.loading = true;
      this.axios
        .get("inyigisho", {
          cancelToken: new CancelToken(function executor(token) {
            CANCEL_TOKEN = token;
          })
        })
        .then(res => {
          this.studies = res.data.data;
          console.log(this.studies);
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage || "");
        });
      this.CancelAxios = CANCEL_TOKEN;
    },
    studyCreated(createdItem) {
      this.studies = [createdItem].concat(this.studies);
    },
    studyDeleted(deletedItem) {
      Object.keys(this.studies).map(
        key =>
          this.studies[key].id == deletedItem.id &&
          this.studies[key].body == deletedItem.body &&
          this.studies[key].title == deletedItem.title &&
          this.$delete(this.studies, key)
      );
      console.log(this.studies);
      console.log(deletedItem);
    }
  }
};
</script>
