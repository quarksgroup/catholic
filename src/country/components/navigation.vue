<template>
  <nav id="country-nav">
    <div class="logo">EmaRWANDA</div>
    <div class="links">
      <ul>
        <router-link tag="li" :to="'/country'" :exact-active-class="'active'">
          <i class="fa fa-bell" />Amatangazo
        </router-link>
        <router-link
          tag="li"
          :to="'/country/testimonials'"
          :exact-active-class="'active'"
        >
          <i class="fa fa-comment-dots" />Ubuhamya
        </router-link>
        <router-link
          tag="li"
          :to="'/country/studies'"
          :exact-active-class="'active'"
        >
          <i class="fa fa-play-circle" />Inyigisho
        </router-link>
        <router-link
          tag="li"
          :to="'/country/accounts'"
          :exact-active-class="'active'"
        >
          <i class="fa fa-user-cog" />Accounts
        </router-link>
      </ul>
    </div>

    <b-dropdown
      aria-role="list"
      class="__nav-dropdown"
      position="is-bottom-left"
    >
      <div class="user-profile" slot="trigger">
        <img :src="user_logo" />
      </div>
      <b-dropdown-item
        custom
        aria-role="menuitem"
        class="custom"
        v-if="user && user.name"
      >
        Logged in as
        <b>{{ user.name }}</b>
      </b-dropdown-item>
      <hr class="dropdown-divider" aria-role="menuitem" />
      <b-dropdown-item aria-role="listitem">
        <router-link tag="li" exact-active-class="active-link" to="/profile">
          <b-icon pack="fa" icon="user-alt"></b-icon>Profile
        </router-link>
      </b-dropdown-item>
      <b-dropdown-item aria-role="menuitem">
        <router-link
          tag="li"
          exact-active-class="active-link"
          to="/testimonials-requests"
        >
          <b-icon pack="fa" icon="random"></b-icon>Testimonials Requests
        </router-link>
      </b-dropdown-item>
      <hr class="dropdown-divider" aria-role="menuitem" />
      <b-dropdown-item aria-role="menuitem" @click="$router.push('/logout')">
        <router-link tag="li" exact-active-class="active-link" to="/logout">
          <b-icon pack="fa" icon="sign-out-alt"></b-icon>Logout
        </router-link>
      </b-dropdown-item>
    </b-dropdown>
    <div class="menu">
      <img :src="menu_logo" />
    </div>
  </nav>
</template>

<script>
import userProfile from "@/assets/img/user_profile.svg";
import menu from "@/assets/img/menu.svg";
export default {
  name: "navigation-component",
  data() {
    return {
      user_logo: userProfile,
      menu_logo: menu,
    };
  },
  computed: {
    user() {
      return this.$store.getters.userDetails;
    },
  },
  methods: {
    goToProfile() {
      if (this.$route.name != "Profile Page")
        this.$router.push("/country/profile");
    },
  },
};
</script>

<style lang="scss">
#country-nav {
  grid-row: 1;
  background: blueviolet;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  z-index: 100;

  .logo {
    min-width: 80px;
    font-size: 24px;
    letter-spacing: 1px;
    font-weight: bold;
  }
  .links {
    align-self: flex-end;
    flex: 1;
    margin: 0 2rem;
    ul {
      display: flex;
      align-items: center;
      flex: 1;

      li {
        flex: 1;
        text-align: center;
        padding: 0.4rem;
        font-size: 15px;
        text-transform: capitalize;
        cursor: pointer;
        background: blueviolet;
        color: white;
        white-space: nowrap;
        margin: 0 1px;

        &:hover {
          background: white;
          transition: background 350ms;
          color: blueviolet;
        }
        i {
          margin-right: 5px;
        }
      }
      li.active {
        background: white;
        color: blueviolet;
      }
    }
  }
  .user-profile {
    max-height: 50px;
    min-height: 50px;
    max-width: 50px;
    min-width: 50px;
    border-radius: 50%;
    border: 1px solid ghostwhite;
    background: ghostwhite;
    margin-right: 10px;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
    }
  }
  .menu {
    display: none;
  }
  .__nav-dropdown {
    .dropdown-menu {
      margin-top: 0.4rem;

      .dropdown-content {
        border-radius: 1px;
        background-color: ghostwhite;
        box-shadow: 1px 1px 6px 0 rgba(32, 33, 36, 0.28);
        padding-bottom: 0;

        .dropdown-item {
          padding: 0;
          li {
            font-size: 0.95rem;
            transition: all 0.25s ease;
            padding: 0.75rem 1rem;
            margin: 0.15rem 0;

            i {
              margin-right: 0.25rem;
              font-size: 1rem;
            }

            &:hover,
            &.active-link {
              background-color: blueviolet;
              color: white;
            }
          }

          &.custom {
            font-size: 0.95rem;
            transition: all 0.25s ease;
            padding: 0.75rem 1rem;
          }
        }
        hr {
          margin: 0;
        }
      }
    }
  }
}
</style>