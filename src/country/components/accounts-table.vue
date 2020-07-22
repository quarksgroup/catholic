<template>
  <div class="accounts-table-holder ema-scrollBar">
    <!-- <header></header> -->
    <b-table
      hoverable
      narrowed
      striped
      sticky-headers
      :loading="loading"
      :data="accounts"
      :opened-detailed="openedDetail"
      detailed
      detail-key="id"
      ref="accountsTable"
      show-detail-icon
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Names">
          <template>
            <a @click="toggle(props.row)">
                <i class=""></i>
            </a>
            {{ props.row.name }}
          </template>
        </b-table-column>
        <b-table-column field="username" label="Username">{{ props.row.username }}</b-table-column>
        <b-table-column field="phone" label="Phone Number">{{ props.row.phone }}</b-table-column>

        <b-table-column field="created_at" label="Date" centered>
          <span class="tag is-primary">{{ props.row.created_at}}</span>
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>No accounts available at the moment.</p>
          </div>
        </section>
      </template>
      <template slot="footer">
        <div class="has-text-centered p-3">
          <i class="fa fa-infinity mr-1" />End
        </div>
      </template>
      <template slot="detail" slot-scope="props">
        <div class="detail-row">
          <section>
            <div>
              <strong>Email:</strong>
            </div>
            <label for="strong">{{ props.row.email || "Not Availabe" }}</label>
          </section>
          <section>
            <div>
              <strong>Role:</strong>
            </div>
            <label for="strong">{{ props.row.role ? props.row.role.description : 'Not available' }}</label>
          </section>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "accounts-table-component",
  props: {
    accounts: Array,
    loading: Boolean
  },
  data() {
    return {
      openedDetail: []
    };
  },
  methods: {
    toggle(row) {
      this.$refs.accountsTable.toggleDetails(row);
    }
  }
};
</script>

<style lang="scss">
.accounts-table-holder {
  padding: 1rem;
  overflow: auto;
  //100vh - navbar - country-content padding - table-holder header height
  max-height: calc(100vh - 70px - 4rem - 40px);
  tr.detail {
    box-shadow: none !important;
    background: transparent !important;
    .detail-container {
      padding: 0 !important;

      .detail-row {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0.5rem 1rem;
        flex-direction: column;
        border: 1px solid #dbdbdb;
        background: #fafafa;
        border-radius: 3px;

        section {
          background-color: transparent !important;
          border: none !important;
          display: flex;
          align-items: center;
          width: 100%;
          font-size: 0.95rem;
          min-height: 35px;

          div {
            min-width: 3.5rem;
          }
        }
      }
    }
  }
}
</style>