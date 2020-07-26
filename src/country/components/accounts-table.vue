<template>
  <div class="accounts-table-holder ema-scrollBar">
    <!-- <header></header> -->
    <b-table
      hoverable
      narrowed
      striped
      sticky-headers
      :paginated="showPagination"
      :backend-pagination="showPagination"
      :total="pagination.total || 0"
      :per-page="pagination.per_page || 0"
      @page-change="changedPage"
      :data="loading ? [] : shownAccounts"
      :opened-detailed="openedDetail"
      detailed
      detail-key="id"
      ref="accountsTable"
      show-detail-icon
    >
      <!-- props slot -->
      <template slot-scope="props">
        <b-table-column field="name" label="Names">
          <template>
            <a @click="toggle(props.row)">
              <i class></i>
            </a>
            {{ props.row.name }}
          </template>
        </b-table-column>
        <b-table-column field="username" label="Username">{{ props.row.username }}</b-table-column>
        <b-table-column field="phone" label="Phone Number">{{ props.row.phone }}</b-table-column>

        <b-table-column field="created_at" label="Date" centered>{{ props.row.created_at}}</b-table-column>
      </template>

      <!-- details slot -->
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
        <div class="update-row">
          <button class="button is-danger is-outlined" @click="showConfirmation = true">
            <i class="fa fa-trash" />
            Delete Account
          </button>
          <b-modal
            :active.sync="showConfirmation"
            has-modal-card
            trap-focus
            :destroy-on-hide="true"
            aria-role="dialog"
            aria-modal
          >
            <delete-confirmation
              :account="props.row"
              @canceled="showConfirmation = false"
              @delete="deleteAccount"
            />
          </b-modal>
        </div>
        <div class="deleting loading" v-if="props.row.loading && props.row.loading == true ">
          <span class="loading-light" />
          <p>deleting account</p>
        </div>
      </template>

      <!-- empty slot -->
      <template slot="empty">
        <section class="section loading has-text-centered p-3" v-if="loading">
          <i class="loading-dark" />
          <p>Loading accounts</p>
        </section>
        <section class="section" v-else-if="haveAccounts">
          <div class="content p-3 has-text-centered">
            <p>No accounts found at the moment.</p>
          </div>
        </section>
        <section class="section" v-else-if="searchedName">
          <div class="content p-3 has-text-centered">
            <p>
              No accounts with the name
              <span class="has-text-weight-bold">{{searchedName}}</span>.
            </p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "accounts-table-component",
  components: {
    deleteConfirmation: () =>
      import("../../globals/components/deleteAccount-confirmation.vue"),
  },
  props: {
    accounts: Array,
    loading: Boolean,
    searchedName: String,
    pagination: Object,
  },
  data() {
    return {
      openedDetail: [],
      account: [],
      showConfirmation: false,
    };
  },
  computed: {
    haveAccounts() {
      return Boolean(this.shownAccounts.length > 0);
    },
    shownAccounts() {
      if (this.loading == true) return [];
      return this.accounts.filter((account) =>
        account.name.toLowerCase().includes(this.searchedName.toLowerCase())
      );
    },
    showPagination() {
      if (
        !this.loading &&
        this.pagination &&
        this.pagination.total &&
        this.pagination.per_page &&
        this.pagination.total > this.pagination.per_page
      )
        return true;
      return false;
    },
  },
  mounted() {},
  methods: {
    toggle(row) {
      this.$refs.accountsTable.toggleDetails(row);
    },
    deleteAccount(account) {
      this.showConfirmation = false;
      this.$set(account, "loading", true);
      this.axios
        .delete(`user/${account.id}`)
        .then((res) => {
          this.$set(account, "loading", false);
          if (res.data.message) this.$toast.success(res.data.message);
          if (res.status == 200) this.$emit("deleteAccount", account);
        })
        .catch((err) => {
          this.$set(account, "loading", false);
          if (err.errorMessage) this.$toast.error(err.errorMessage);
        });
    },
    changedPage(page) {
      this.$emit("fetchAccounts", page);
    },
  },
};
</script>

<style lang="scss">
.accounts-table-holder {
  padding: 1rem;
  overflow: auto;
  //100vh - navbar - country-content padding - table-holder header height
  max-height: calc(100vh - 70px - 40px - 3.5rem);

  table {
    min-width: max-content;
  }

  tr.detail {
    box-shadow: none !important;
    background: transparent !important;

    td {
      padding: 0.25rem 0;
      transition: 0.2s linear;
    }

    .detail-container {
      position: relative;
      padding: 0.25rem 0.5rem !important;
      border: 1px solid #dbdbdb;
      border-radius: 3px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #efefef;

      .detail-row {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: auto;

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
      .update-row {
        align-self: flex-end;
        display: flex;
        justify-content: flex-end;

        i {
          margin-right: 0.25rem;
        }

        button {
          height: 2rem;
          padding: 0 0.5rem;
          font-size: 1rem;
          border-radius: 3px;
          transition: 0.2s linear;

          &:active {
            transform: translateY(2px);
          }
        }
      }
    }
  }
  .deleting {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;

    span {
      margin-bottom: 0.5rem;
      height: 1.5rem;
      width: 1.5rem;
    }
    p {
      font-weight: normal !important;
    }
  }
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    user-select: none;

    i {
      width: 2rem;
      height: 2rem;
      margin-bottom: 1rem;
    }
    p {
      font-weight: bold;
    }
  }
}
</style>