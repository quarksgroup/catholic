<template>
  <div class="add-testimonial">
    <header>Add Testimonial</header>
    <div class="body">
      <div class="control">
        <b-field label="Testimonial Message:">
          <textarea
            name="testimonial_message"
            id="testimonial-message"
            rows="1"
            cols="1"
            placeholder="write Testimonial message here..."
          ></textarea>
        </b-field>
      </div>
      <div class="control">
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
.add-testimonial {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.25);
  border-radius: 7px;
  width: 100%;
  min-width: 370px;
  height: fit-content;
  header {
    background: blueviolet;
    padding: 0.5rem;
    color: ghostwhite;
    border-radius: 7px 7px 0 0;
  }
  .body {
    padding: 1rem;

    .control {
      display: flex;
      flex-direction: column;
      label {
        font-size: 15px;
        color: #6b686d;
        margin-bottom: 2px;
      }
      textarea {
        width: 100% !important;
        padding: 0.5rem;
        min-height: 200px;
        max-height: 200px;
      }
      select,
      textarea {
        border-radius: 5px !important;
        color: #545258;
        border-color: #e0e0e7;
        font-family: inherit;
        font-size: 15px;
        width: 100%;
      }

      &.btn {
        margin: 0;
        button {
          width: fit-content;
          margin-left: auto;
          border-radius: 5px;
          padding: 4px 2rem;
          height: fit-content;
          font-family: inherit;
        }
      }
    }
  }
}
</style>