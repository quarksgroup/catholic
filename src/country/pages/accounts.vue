<template>
  <div class="accounts-dashboard ema-container">
    <div class="all-accounts">
      <header>
        <h5>Table of accounts</h5>
        <b-input
          type="search"
          class="is-outlined"
          icon-pack="fas"
          icon="search"
          :disabled="disableSearchInput"
          placeholder="Search account name..."
          v-model="searchedName"
        />
        <button
          class="button is-inverted is-outlined is-primary"
          :disabled="disableRefreshBtn"
          @click="fetchAccounts"
        >Refresh</button>
      </header>
      <accounts-table
        :accounts="accounts"
        :loading="state.loading"
        @deleteAccount="accountDeleted"
        :searchedName="searchedName"
        :pagination="pagination"
        @fetchAccounts="fetchAccounts"
      />
    </div>
    <add-account />
  </div>
</template>

<script>
import addAccount from "../components/add-account";
import AccountsTable from "../components/accounts-table";
export default {
  components: { addAccount, AccountsTable },
  data() {
    return {
      state: { loading: false },
      accounts: [],
      pagination: {},
      searchedName: "",
    };
  },
  computed: {
    disableSearchInput() {
      return this.state.loading == true || this.accounts.length < 1;
    },
    disableRefreshBtn() {
      return this.state.loading == true;
    },
  },
  beforeMount() {
    this.fetchAccounts(1);
  },
  methods: {
    fetchAccounts(page) {
      this.state.loading = true;
      this.axios
        .get(`users-list?page=${page ? page : 1}`)
        .then((res) => {
          this.$set(this, "accounts", res.data.data);
          this.$set(this, "pagination", res.data.meta);
          this.state.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage);
        });
    },
    accountDeleted(deletedAccount) {
      if (this.accounts.indexOf(deletedAccount) !== -1)
        this.accounts.splice(this.accounts.indexOf(deletedAccount), 1);
    },
  },
};
</script>

<style lang="scss">
.accounts-dashboard {
  .all-accounts {
    grid-column: 1;
    border-radius: 5px;
    background: white;
    box-shadow: 1px 1px 6px 0 rgba(32, 33, 36, 0.28);
    height: fit-content;
    max-width: calc(100vw - 370px - 3rem);
    & > header {
      background: blueviolet;
      padding: 0.5rem 1rem;
      color: white;
      border-radius: 5px 5px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h5 {
        flex: 1;
        margin-right: 0.75rem;
      }
      button {
        margin-left: 0.75rem;
        border-radius: 3px;
      }
    }
  }
}
</style>