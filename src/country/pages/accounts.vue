<template>
  <div class="accounts-dashboard ema-container">
    <div class="all-accounts">
      <header>
        <h5>Table of accounts</h5>
      </header>
      <accounts-table :accounts="accounts" :loading="state.loading" />
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
      accounts: []
    };
  },
  mounted() {
    // console.log(this.$CancelToken());
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      this.state.loading = true;
      this.axios
        .get("users-list")
        .then(res => {
          this.accounts = res.data.data;
          this.state.loading = false;
        })
        .catch(err => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage);
        });
    }
  }
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
    header {
      background: blueviolet;
      padding: 0.5rem 1rem;
      color: white;
      border-radius: 5px 5px 0 0;
    }
    
  }
}
</style>