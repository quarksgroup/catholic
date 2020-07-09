<template>
  <div class="add-testimonial">
    <header>Add Testimonial</header>
    <form class="body" @submit.prevent="createTestimonial">
      <b-field label="Testimonial Message:" class="mb-3">
        <textarea
          name="testimonial_message"
          id="testimonial-message"
          rows="1"
          cols="1"
          placeholder="write Testimonial message here..."
          required
        ></textarea>
      </b-field>
      <div class="select-grids">
        <b-field label="Country:">
          <b-select placeholder="select country..." class="br-1" required>
            <option value="hello">hello</option>
          </b-select>
        </b-field>
        <b-field label="Province:">
          <b-select placeholder="select province..." class="br-1" required>
            <option value="hello">hello</option>
          </b-select>
        </b-field>
        <b-field label="Sector:">
          <b-select placeholder="select sector..." class="br-1" required>
            <option value="hello">hello</option>
          </b-select>
        </b-field>
        <b-field label="Groupe de priere:">
          <b-select placeholder="select Gr.Priere..." class="br-1" required>
            <option value="hello">hello</option>
          </b-select>
        </b-field>
      </div>
      <div class="btn control">
        <button class="br-1 button is-primary" type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ["Country", "Diocese", "paroisse"]
    };
  },
  methods: {
    createTestimonial() {
      alert("This will create a testimonial");
    }
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
  form.body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    label {
      font-size: 15px;
      margin-bottom: 0.2rem;
    }
    textarea {
      width: 100% !important;
      padding: 0.5rem;
      min-height: 200px;
      max-height: 200px;
    }
    select,
    textarea {
      color: #2c3e50;
      border-color: #e0e0e7;
      font-family: inherit;
      font-size: 15px;
      width: 100%;
    }

    .btn {
      margin: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
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
</style>