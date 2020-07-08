<template>
  <div class="add-study">
    <header>
      <h5>Add Inyigisho</h5>
      <i class="fa fa-times cursor-pointer" @click="$modal.hide('add-study')" />
    </header>
    <div class="body">
      <b-field label="Title:">
        <b-input placeholder="Inyigisho Title..." class="no-shadow br-1" />
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
      <b-field class="btn">
        <b-button class="is-primary" @click="upload">Upload</b-button>
      </b-field>
    </div>
  </div>
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
  & > header {
    background: blueviolet;
    color: white;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
    .btn {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>