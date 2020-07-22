<template>
  <main id="profile-page">
    <section>
      <header>
        <h3>Personal Information</h3>
      </header>
      <form @submit.prevent="updateAccount">
        <b-field label="Names">
          <b-input placeholder="N/A" validation-message=" " v-model="name" required />
        </b-field>
        <b-field label="Username">
          <b-input placeholder="N/A" validation-message=" " v-model="username" required />
        </b-field>
        <b-field label="Email">
          <b-input type="email" placeholder="N/A" validation-message=" " v-model="email" required />
        </b-field>
        <b-field label="Phone Number">
          <b-input validation-message=" " placeholder="N/A" v-model="phone" required />
        </b-field>
        <b-field label="User Role">
          <b-input placeholder="N/A" validation-message=" " disabled v-model="userRole" />
        </b-field>
        <b-field label="User Belongs to">
          <b-input placeholder="N/A" validation-message=" " disabled v-model="userBelongsTo" />
        </b-field>
        <button class="button is-primary" type="submit" v-if="state.showUpdatebtn">Update Profile</button>
        <div class="loading" v-if="state.loading">
          <div class="loading-light"></div>
          <p>updating profile</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "profile-component",
  data() {
    return {
      state: {
        loading: false,
        showUpdatebtn: true
      },
      name: null,
      username: null,
      email: null,
      phone: null,
      userRole: null,
      userBelongsTo: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.userDetails;
    }
  },
  watch: {
    name() {
      handler: {
        this.state.showUpdatebtn = this.checkEquality();
      }
    },
    email() {
      handler: {
        this.state.showUpdatebtn = this.checkEquality();
      }
    },
    phone() {
      handler: {
        this.state.showUpdatebtn = this.checkEquality();
      }
    },
    username() {
      handler: {
        this.state.showUpdatebtn = this.checkEquality();
      }
    },
    user() {
      handler: {
        if (this.user) {
          this.name = this.user.name;
          this.username = this.user.username;
          this.email = this.user.email;
          this.phone = this.user.phone;
          this.userRole = this.user.role.description;
          this.userBelongsTo = this.user.belongs_to;
        }
      }
    }
  },
  beforeMount() {
    this.setInformation();
  },
  mounted() {},
  methods: {
    updateAccount() {
      this.state.loading = true;
      const reqData = {
        name: this.name,
        username: this.username,
        phone: this.phone,
        email: this.email
      };
      Object.keys(reqData).map(
        key => reqData[key] == null && delete reqData[key]
      );
      this.axios
        .post("profile", reqData)
        .then(res => {
          this.state.loading = false;
          if (res.data.message) this.toast.success(res.data.message);
          if (res.status == 200) {
            this.$store.dispatch("SETUSER", res.data.data);
          }
        })
        .catch(err => {
          this.state.loading = false;
          if (err.errorMessage) this.$toast.error(err.errorMessage);
        });
    },
    checkEquality() {
      if (!this.user) return false;
      else if (this.name != this.user.name) return true;
      else if (this.user.email != this.email) return true;
      else if (this.user.phone != this.phone) return true;
      else if (this.user.username != this.username) return true;
    },
    setInformation() {
      if (this.user) {
        this.name = this.user.name;
        this.username = this.user.username;
        this.email = this.user.email;
        this.phone = this.user.phone;
        this.userRole = this.user.role.description;
        this.userBelongsTo = this.user.belongs_to;
      }
    }
  }
};
</script>

<style lang="scss">
#profile-page {
  min-height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1.5rem;
  flex-direction: column;

  section {
    background: white;
    box-shadow: 1px 1px 6px 0 rgba(32, 33, 36, 0.28);
    border-radius: 5px;
    min-width: 720px;
    position: relative;
    & > header {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: blueviolet;
      color: white;
      height: 40px;
      padding: 0 0.75rem;
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      h3 {
        font-size: 1.15rem;
        font-weight: bold;
      }
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 1rem 2.5rem;
      position: relative;

      .field {
        min-width: 350px;
        width: 100%;

        label {
          margin-bottom: 0.25rem;
        }

        input {
          box-shadow: unset;
          box-shadow: unset;
          height: 2.4rem;
          border-radius: 1px;

          &:disabled {
            background-color: whitesmoke;
            border-color: whitesmoke;
            box-shadow: none;
            color: #7a7a7a;
          }
        }
      }

      button {
        border-radius: 2px;
        align-self: flex-end;
      }
    }
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      user-select: none;

      .loading-light {
        height: 2.5rem;
        width: 2.5rem;
      }
      p {
        font-size: 1.15rem;
        color: white;
        margin-top: 1rem;
      }
    }
  }
}
</style>