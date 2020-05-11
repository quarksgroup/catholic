<template>
  <div class="add-announcement">
    <header>
      <h5>Add Announcement</h5>
      <i class="fa fa-times cursor-pointer" @click="$modal.hide('add-announcement')" />
    </header>
    <div class="body">
      <div class="control">
        <b-field label="Announcement:">
          <textarea
            name="announcement_message"
            id="announcement-message"
            rows="1"
            cols="1"
            placeholder="Write announcement here..."
          ></textarea>
        </b-field>
      </div>
      <div class="control mt-3">
        <b-field class="columns is-full">
          <b-field class="column is-half" label="country:">
            <b-select placeholder="Select a level..." icon-pack="fa">
              <option v-for="(option,i) in options" :value="option" :key="i">{{ option }}</option>
            </b-select>
          </b-field>
          <b-field class="column is-half" label="Province:">
            <b-select placeholder="Select a level..." icon-pack="fa">
              <option v-for="(option,i) in options" :value="option" :key="i+300">{{ option }}</option>
            </b-select>
          </b-field>
        </b-field>
        <b-field class="columns is-full">
          <b-field class="column is-half" label="Sector:">
            <b-select placeholder="Select a level..." icon-pack="fa">
              <option v-for="(option,i) in options" :value="option" :key="i+100">{{ option }}</option>
            </b-select>
          </b-field>
          <b-field class="column is-half" label="Groupe de priere:">
            <b-select placeholder="Select a level..." icon-pack="fa">
              <option v-for="(option,i) in options" :value="option" :key="i+200">{{ option }}</option>
            </b-select>
          </b-field>
        </b-field>
      </div>
      <div class="btn control">
        <b-button type="is-primary">Add</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ["Country", "Diocese", "paroisse"]
    };
  }
};
</script>

<style lang="scss">
.add-announcement {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.25);
  border-radius: 7px;
  width: 100%;
  min-width: 370px;
  height: fit-content;
  header {
    background: blueviolet;
    padding: 0.5rem 1rem;
    color: ghostwhite;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .body {
    padding: 1rem;
    textarea::placeholder,
    .select.is-empty select {
      color: #8a8989 !important;
      font-size: 15px;
    }

    .control {
      display: flex;
      flex-direction: column;
      label {
        color: #6b686d;
        margin-bottom: 3px;
        text-transform: capitalize;
        font-size: 15.5px;
      }
      textarea {
        width: 100% !important;
        padding: 0.5rem;
        min-height: 200px;
        max-height: 200px;
      }
      select,
      textarea {
        color: #545258;
        border-color: #e0e0e7;
        font-family: inherit;
        font-size: 15px;
        width: 100%;
        border-radius: 2px;
      }

      &.btn {
        margin: 1.5rem 0 0;
        button {
          width: fit-content;
          margin-left: auto;
          padding: 4px 2rem;
          height: fit-content;
          font-family: inherit;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>