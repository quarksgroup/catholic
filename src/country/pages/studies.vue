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
            v-model="searchedTitle"
          />
        </b-field>
        <button class="button is-primary br-1" @click="fetchData">Refresh</button>
      </header>
      <div class="page-loading" v-if="state.loading">
        <div class="loading-component loading-dark" />
        <p>Loading studies...</p>
      </div>
      <div class="ema-grids" v-if="showStudies">
        <video-card
          v-for="study in shownStudies"
          :key="study.id"
          :video="study"
          from="inyigisho"
          @deleted="studyDeleted"
          @edit="editStudy"
        />
      </div>
      <div class="page-error" v-else-if="searchedTitle">
        <article>
          There are no Studies with the title
          <b class="has-text-weight-bold">{{searchedTitle}}</b>
        </article>
      </div>
      <div class="page-error" v-else-if="!state.loading">
        <p>There are no Studies available, For now!</p>
      </div>
    </div>
    <update-study
      v-if="showUpdateForm"
      :study="objectToUpdate"
      @updated="studyUpdated"
      @close="objectToUpdate=null"
    />
    <add-study v-else @created="studyCreated" />
  </div>
</template>

<script>
import videoCard from "../components/Video-card";
import addStudy from "../components/add-study.vue";
import updateStudy from "../components/update-study.vue";
export default {
  name: "study-component",
  components: { videoCard, addStudy, updateStudy },
  data() {
    return {
      state: { loading: true, is_refreshing: false },
      studies: [],
      CancelAxios: null,
      objectToUpdate: null,
      searchedTitle: "",
    };
  },
  computed: {
    showStudies() {
      if (this.shownStudies.length > 0) return true;
      else return false;
    },
    showUpdateForm() {
      return this.objectToUpdate ? true : false;
    },
    shownStudies() {
      return this.studies.filter((study) =>
        study.title.toLowerCase().includes(this.searchedTitle.toLowerCase())
      );
    },
  },
  beforeMount() {
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
          }),
        })
        .then((res) => {
          this.studies = res.data.data;
          console.log(this.studies);
          this.state.loading = false;
        })
        .catch((err) => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage || "");
        });
      this.CancelAxios = CANCEL_TOKEN;
    },
    studyCreated(createdItem) {
      this.studies = [createdItem].concat(this.studies);
    },
    studyDeleted(deletedItem) {
      if (this.studies.indexOf(deletedItem) !== -1)
        this.studies.splice(this.studies.indexOf(deletedItem), 1);
    },
    studyUpdated(updatedItem) {
      Object.keys(this.studies).map(
        (key) =>
          this.studies[key].id == updatedItem.id &&
          this.$set(this.studies, key, updatedItem)
      );
    },
    editStudy(itemToEdit) {
      this.objectToUpdate = itemToEdit;
    },
  },
};
</script>
