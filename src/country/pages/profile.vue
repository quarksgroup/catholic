<template>
  <div id="profile-page">
    <!-- Sidebar -->
    <aside>
      <ul class="ema-scrollbar">
        <li
          :class="{'active-link' : state.ShownComponent == 1}"
          @click="state.ShownComponent = 1"
        >Edit Profile</li>
        <li
          :class="{'active-link' : state.ShownComponent == 2}"
          @click="state.ShownComponent = 2"
        >Edit Password</li>
      </ul>
    </aside>

    <!-- Main -->
    <main class="profile-page-content ema-scrollbar">
      <profile v-if="state.ShownComponent == 1" />
      <edit-password v-else-if="state.ShownComponent == 2" />
    </main>
  </div>
</template>

<script>
import profile from "../components/EditProfile";
import EditPassword from "../components/EditPassword";
export default {
  name: "profile-page",
  components: {
    profile,
    EditPassword,
  },
  data() {
    return {
      state: {
        ShownComponent: 1,
      },
    };
  },
};
</script>

<style lang='scss'>
#profile-page {
  max-height: calc(100vh - 70px);
  display: flex;
  margin: -2rem -1rem;
  min-height: calc(100vh - 70px);
  aside {
    width: 280px;
    min-width: 280px;
    min-height: 450px;
    max-height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
      height: 90%;
      width: 95%;
      max-height: 90%;
      max-width: 95%;
      margin: auto;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
      overflow-y: auto;
      overflow-x: hidden;
      background: lighten($color: blueviolet, $amount: 45);
      border: 1px solid #d6d6dd;

      li {
        padding: 0.75rem;
        margin: 1px;
        transition: 0.2s linear;
        cursor: pointer;

        &:hover,
        &.active-link {
          background: blueviolet;
          color: white;
        }
      }
    }
  }
  .profile-page-content {
    flex: 1;
    overflow: auto;
    padding: 2rem 1rem;
  }
}
</style>