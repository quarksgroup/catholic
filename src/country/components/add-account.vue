<template>
  <div class="add-account">
    <header>
      <h5>Add an account</h5>
    </header>
    <form>
      <b-field label="Names:">
        <b-input type="text" placeholder="Enter names..." class="no-b-radius no-shadow" />
      </b-field>
      <b-field label="Phone number:">
        <b-input type="number" placeholder="Enter phone number..." class="no-b-radius no-shadow" />
      </b-field>
      <b-field class="columns is-full">
        <b-field class="column is-half" label="Country:">
          <b-select placeholder="select country..." class="no-b-radius">
            <option value="hello">hello</option>
          </b-select>
        </b-field>
        <b-field class="column is-half" label="Province:">
          <b-select placeholder="select province..." class="no-b-radius">
            <option value="hello">hello</option>
          </b-select>
        </b-field>
      </b-field>
      <b-field class="columns is-full">
        <b-field class="is-half column" label="Sector:">
          <b-select placeholder="select sector..." class="no-b-radius">
            <option value="hello">hello</option>
          </b-select>
        </b-field>
        <b-field class="is-half column" label="Groupe de priere:">
          <b-select placeholder="select Gr.Priere..." class="no-b-radius">
            <option value="hello">hello</option>
          </b-select>
        </b-field>
      </b-field>
      <b-field class="addBtn">
        <b-button class="is-primary">Add</b-button>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.add-account {
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  max-height: calc(100vh - 70px - 4rem);
  height: fit-content;
  header {
    background: blueviolet;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px 5px 0 0;
  }
  form {
    padding: 1.5rem 1rem 2rem;
    .select,
    .select select {
      width: 100%;
    }
    .label:not(:last-child) {
      margin-bottom: 0.25em;
    }
    .field:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    input::placeholder,
    .select.is-empty select {
      color: #9e9c9c !important;
      font-size: 15px;
    }
    .column {
      margin-bottom: 0 !important;
    }
    .addBtn {
      display: flex;

      button {
        flex: 1;
      }
    }
  }
}
</style>