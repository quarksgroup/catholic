<template>
  <div class="add-announcement">
    <header>
      <h5>Add Announcement</h5>
      <i class="fa fa-times cursor-pointer" @click="$modal.hide('add-announcement')" />
    </header>
    <form @submit.prevent="createAnnouncement" class="body">
      <div class="control">
        <b-field label="Announcement:">
          <textarea
            name="announcement_message"
            id="announcement-message"
            rows="1"
            cols="1"
            placeholder="Write announcement here..."
            required
          />
        </b-field>
      </div>
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
        <button type="submit " class="br-1 button is-primary">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: { loading: false, error: null },
      options: ["Country", "Diocese", "paroisse"],
      title: "",
      message: "",
      country: null,
      province: null,
      sector: null,
      group: null
    };
  },
  methods: {
    createAnnouncement() {
      this.state.loading = true;
      const reqData = {
        title: this.title,
        body: this.message,
        country_id: this.country,
        province_id: this.province,
        sector_id: this.sector,
        groupe_de_priere_id: this.group
      };
      this.axios
        .post("announcement", reqData)
        .then(res => {
          console.log(res.data);
          this.$modal.hide("add-announcement");
          this.clear();
        })
        .catch(err => {
          this.state.loading = false;
          if (err) this.$toast(err.errorMessage || "");
        });
    },
    clear() {
      this.title = "";
      this.message = "";
      this.country = null;
      this.province = null;
      this.sector = null;
      this.group = null;
      this.state.loading = false;
      this.state.error = null;
    }
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
  form.body {
    padding: 1rem;
    textarea::placeholder,
    .select.is-empty select {
      font-size: 15px;
    }

    label {
      margin-bottom: 3px;
      font-size: 15.5px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    textarea {
      width: 100% !important;
      padding: 0.5rem;
      min-height: 200px;
      max-height: 200px;
    }
    select,
    textarea {
      border-color: #ccc;
      font-family: inherit;
      font-size: 15px;
      width: 100%;
      border-radius: 2px;
    }

    & > .btn {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
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
</style>