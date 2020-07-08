<template>
  <div class="add-account">
    <header>
      <h5>Add an account</h5>
    </header>
    <form @submit.prevent="addAccount">
      <b-field label="Names:">
        <b-input type="text" placeholder="Enter names..." class="br-1 no-shadow" required />
      </b-field>
      <b-field label="Phone number:">
        <b-input
          type="number"
          placeholder="Enter phone number..."
          class="br-1 no-shadow"
          required
        />
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
      <b-field class="addBtn">
        <button class="button is-primary" type="submit">Add</button>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  name: "addAccountComponent",
  methods: {
    addAccount() {
      alert("account created");
    }
  }
};
</script>

<style lang="scss">
.add-account {
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  max-height: calc(100vh - 70px - 4rem);
  height: 100%;
  overflow-y: auto;

  header {
    background: blueviolet;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px 5px 0 0;
    height: 40px;
  }
  form {
    padding: 1.5rem 1rem 2rem;
    height: calc(100% - 40px);
    overflow-y: auto;
    .select,
    .select select {
      width: 100%;
    }
    .label {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:not(:last-child) {
        margin-bottom: 0.25em;
      }
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
    .select-grids {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      grid-column-gap: 1rem;
      grid-row-gap: 1rem;
      align-items: start;
      justify-content: center;
      margin-bottom: 2rem;

      .field {
        margin-bottom: 0;
      }
    }
  }
}
.add-account,
form {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #777777;
    outline: 1px solid slategrey;
    border-radius: 2px;
  }
}
</style>