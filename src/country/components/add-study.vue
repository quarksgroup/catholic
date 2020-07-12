<template>
  <form @submit.prevent="upload" class="add-study">
    <header class="ema-add-header">
      <h5>Add Inyigisho</h5>
    </header>
    <div class="body">
      <b-field label="Title:">
        <b-input placeholder="Inyigisho Title..." class="no-shadow br-1" autofocus trim required />
      </b-field>
      <b-field label="video:">
        <b-upload
          v-model="files"
          multiple
          drag-drop
          expanded
          class="br-1 w-100"
          type="is-dark"
          v-if="files.length < 1"
          required
        >
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" pack="fa" size="is-large"></b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
        <div class="tags" v-else>
          <span v-for="(file, index) in files" :key="index" class="tag is-primary">
            {{file.name}}
            <button class="delete is-small" type="button" @click="dropFile(index)"></button>
          </span>
        </div>
      </b-field>
      <b-field class="ema-btn control">
        <button class="is-primary br-1 button">Upload</button>
      </b-field>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    upload() {
      this.$modal.hide("add-study");
      this.$toast.success("!", "Video(s) uploaded successfully");
    },
    dropFile(index) {
      this.files.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.add-study {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.25);
  border-radius: 7px;
  width: 100%;
  min-width: 370px;
  height: fit-content;

  & > .body {
    padding: 1rem;
    input {
      font-family: inherit;
      &::placeholder {
        color: #838383 !important;
        font-size: 15px;
      }
    }
    .label:not(:last-child) {
      margin-bottom: 0.3em;
      font-size: 17px;
    }
    .field:not(:last-child) {
      margin-bottom: 1rem;
    }
    .upload > div {
      width: 100%;
    }
    .tags .tag {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 30px;
      border-radius: 1px;
      padding-right: 1rem;
      margin-right: 0;
    }
  }
}
</style>