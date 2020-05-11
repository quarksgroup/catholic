<template>
  <div class="accounts-dashboard">
    <add-account />
    <div class="all-accounts">
      <header>
        <h5>Table of accounts</h5>
      </header>
      <div class="table-holder">
        <b-table hoverable narrowed striped sticky-headers :data="data">
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="50" numeric centered>{{ props.row.id }}</b-table-column>

            <b-table-column field="first_name" label="First Name">{{ props.row.first_name }}</b-table-column>

            <b-table-column field="last_name" label="Last Name">{{ props.row.last_name }}</b-table-column>

            <b-table-column field="gender" label="Gender">{{ props.row.gender }}</b-table-column>

            <b-table-column field="date" label="Date" centered>
              <span class="tag is-primary">{{ new Date(props.row.date).toLocaleDateString() }}</span>
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                </p>
                <p>Nothing here.</p>
              </div>
            </section>
          </template>
          <template slot="footer">
            <div class="has-text-centered p-3">
              <i class="fa fa-infinity mr-1" />End
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "add-account": () => import("../components/add-account")
  },
  data() {
    const data = [
      {
        id: 1,
        first_name: "Jesse",
        last_name: "Simmons",
        date: "2016/10/15 13:43:27",
        gender: "Male"
      },
      {
        id: 2,
        first_name: "John",
        last_name: "Jacobs",
        date: "2016/12/15 06:00:53",
        gender: "Male"
      },
      {
        id: 3,
        first_name: "Tina",
        last_name: "Gilbert",
        date: "2016/04/26 06:26:28",
        gender: "Female"
      },
      {
        id: 4,
        first_name: "Clarence",
        last_name: "Flores",
        date: "2016/04/10 10:28:46",
        gender: "Male"
      },
      {
        id: 5,
        first_name: "Anne",
        last_name: "Lee",
        date: "2016/12/06 14:38:38",
        gender: "Female"
      }
    ];

    return {
      data
    };
  }
};
</script>

<style lang="scss">
.accounts-dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  //100vh - navbar height - country-content padding
  height: calc(100vh - 70px - 4rem);

  .all-accounts {
    grid-column: 2;
    border-radius: 5px;
    background: white;
    box-shadow: 1px 1px 6px 0 rgba(32, 33, 36, 0.28);
    max-height: calc(100vh - 70px - 4rem);
    height: fit-content;
    header {
      background: blueviolet;
      padding: 0.5rem 1rem;
      color: white;
      border-radius: 5px 5px 0 0;
    }
    .table-holder {
      padding: 1rem;
      overflow: auto;
      //100vh - navbar - country-content padding - table-holder header height
      max-height: calc(100vh - 70px - 4rem - 40px);
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
  }
}
</style>