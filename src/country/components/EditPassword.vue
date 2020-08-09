<template>
  <div class="edit-password">
    <form @submit.prevent="EditPassword">
      <header>Change Your Password</header>
      <!-- <div class="control">
        <b-input type="password" password-reveal v-model="currentPassword" />
        <label for="input">Current Password</label>
      </div>-->
      <div class="control">
        <b-input type="password" password-reveal v-model="newPassword" />
        <label for="input">New Password</label>
      </div>
      <div class="control">
        <b-input type="password" password-reveal v-model="newPasswordConfirmation" />
        <label for="input">Confirm New Password</label>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary" :disabled="disableButton">
          <div class="loading flex-center" v-if="state.loading">
            <i class="loading-light" />
          </div>
          <p v-else>Update Password</p>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-password-component",
  data() {
    return {
      state: { loading: false },
      currentPassword: null,
      newPassword: null,
      newPasswordConfirmation: null,
    };
  },
  computed: {
    disableButton() {
      // if (!this.currentPassword) return true;
      // else
      if (!this.newPassword) return true;
      else if (!this.newPasswordConfirmation) return true;
      else if (this.newPassword !== this.newPasswordConfirmation) return true;
      else return false;
    },
    user() {
      return this.$store.getters.userDetails;
    },
  },
  methods: {
    EditPassword() {
      if (this.disableButton == false) {
        this.state.loading = true;
        const reqData = {
          password: this.newPassword,
          password_confirmation: this.newPasswordConfirmation,
          name: this.user && this.user.name ? this.user.name : null,
          username: this.user && this.user.username ? this.user.username : null,
          phone: this.user && this.user.phone ? this.user.phone : null,
        };
        this.axios
          .post("profile", reqData)
          .then((res) => {
            this.state.loading = false;
            if (res.status == 200)
              this.$toast.success("User Password changed successfully!");
          })
          .catch((err) => {
            this.state.loading = false;
            if (err.errorMessage) this.$toast.error(err.errorMessage);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.edit-password {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  header {
    width: 100%;
    margin-bottom: 2.5rem;
    text-align: center;
    font-weight: 600;
    font-size: 1.25rem;
  }
  form {
    min-width: 350px;
    height: fit-content;
    padding: 1rem;
    background: white;
    border-radius: 3px;
    border: 1px solid #dbdbdb;

    .control {
      position: relative;

      &:not(:last-child) {
        margin-bottom: 2rem;
      }

      label {
        left: 8px;
        position: absolute;
        top: 0;
        opacity: 0;
        transition: 0.2s linear;
        background: white;
        transform: translate(0, -50%);
        opacity: 1;
        font-size: 0.9rem;
        text-transform: lowercase;
        outline: none;
        padding: 0 0.25rem;
      }
      input {
        height: 2.25rem;
        padding: 0.25rem 0.75rem 0;
        border: 1px solid #dbdbdb;
        display: inline-flex;
        align-items: center;
        width: 100%;
        background: transparent;
        border-radius: 2px;
        box-shadow: none;

        &:active,
        &:focus {
          border-color: blueviolet;
          outline-width: 0px;
          box-shadow: 0 0 0 2px #3f51b536;
        }
      }
      i {
        font-size: 1rem !important;
      }
      button {
        border-radius: 2px;
        width: 100%;

        .loading {
          width: 100%;
          height: inherit;

          i {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    }
  }
}
</style>