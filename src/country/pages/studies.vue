<template>
  <div class="studies-dashboard">
    <div class="studies">
      <header>
        <h5>Inyigisho zose</h5>
        <button class="button is-primary br-1 mr-2" @click="$modal.show('add-study')">
          <i class="fa fa-plus" /> Add inyigisho
        </button>
        <button class="button is-primary br-1" @click="fetchData">Refresh</button>
      </header>
      <div class="page-loading" v-if="state.loading">
        <div class="loading-component loading-primary" />
        <p>Fetching studies...</p>
      </div>
      <study v-for="i in 11" :key="i" :i="i" v-else-if="!state.loading && !state.error" />
      <div class="page-error" v-else>
        <p>There are no Studies available, For now!</p>
      </div>
    </div>
  </div>
</template>

<script>
import study from "../components/study";
export default {
  name: "study-component",
  components: { study },
  data() {
    return {
      state: { loading: true, is_refreshing: false, error: "" }
    };
  },
  computed: {
    HideStudies() {
      if (this.state.loading == true)
        return this.state.is_refreshing == true
          ? this.state.error
            ? true
            : false
          : false;
      else return this.state.error ? true : false;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.state.loading = true;
      let timeout = setTimeout(() => {
        this.state.loading = false;
        clearTimeout(timeout);
      }, 5000);
    }
  }
};
</script>

<style lang="scss">
.studies-dashboard {
  .studies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    justify-content: center;
    align-items: center;

    & > header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid #999;
      padding: 0.5rem 0;
      grid-column: 1/-1;
      flex-wrap: wrap;
      h5 {
        font-size: 1.25rem;
        text-transform: capitalize;
        font-weight: bold;
        flex: 1;
        width: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>