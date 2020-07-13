<template>
  <div class="add-testimonial">
    <header class="ema-add-header">
      <h5>Add Testimonial</h5>
    </header>
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
            <option
              :value="country"
              v-for="country in countryOptions"
              :key="country.id"
            >{{country.name}}</option>
          </b-select>
        </b-field>
        <b-field label="Province:">
          <b-select placeholder="select province..." class="br-1" required>
            <option
              :value="province"
              v-for="province in provinceOptions"
              :key="province.id"
            >{{province.name}}</option>
          </b-select>
        </b-field>
        <b-field label="Sector:">
          <b-select placeholder="select sector..." class="br-1" required>
            <option :value="sector" v-for="sector in sectorOptions" :key="sector.id">{{sector.name}}</option>
          </b-select>
        </b-field>
        <b-field label="Groupe de priere:">
          <b-select placeholder="select Gr.Priere..." class="br-1" required>
            <option :value="group" v-for="group in groupOptions" :key="group.id">{{group.name}}</option>
          </b-select>
        </b-field>
      </div>
      <div class="ema-btn control">
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
  computed: {
    location() {
      return this.$store.getters.location;
    },
    countryOptions() {
      return this.$countryOptions();
    },
    provinceOptions() {
      return this.$provinceOptions();
    },
    sectorOptions() {
      return this.$sectorOptions();
    },
    groupOptions() {
      return this.$groupOptions();
    }
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
  }
}
</style>