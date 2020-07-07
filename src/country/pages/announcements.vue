<template>
  <div class="announcements-dashboard">
    <div class="announcements-body">
      <header>
        <h5>Announcements in country</h5>

        <b-button class="is-primary no-b-radius" @click="$modal.show('add-announcement')">
          <i class="fa fa-plus" /> Add announcement
        </b-button>
      </header>
      <div class="announcement" v-for="i in 5" :key="i">
        <div class="img no-select">
          <img src="../../assets/img/notify.svg" alt="notify_image" />
        </div>
        <div class="description">
          <header>
            <h5>Ubutumire kubanyamuryango ba croix rouge bose</h5>
            <hr class="hr" />
          </header>
          <p>Lorem ipsum dolor sit amet consectetur</p>
          <b-button class="is-small is-primary">options</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "add-announcement": () => import("../components/add-announcement")
  },
  destroyed() {
    // console.log("destroyed");
  },
  methods: {
    waiting() {
      setTimeout(() => {
        console.log("hello");
        return true;
      }, 5000);
    }
  }
};
</script>

<style lang="scss">
.announcements-dashboard {
  .announcements-body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    justify-content: center;
    align-items: center;

    & > header {
      display: flex;
      padding: 0.25rem;
      grid-column: 1/-1;
      align-items: center;
      border-bottom: 2px solid #999;
      justify-content: space-between;

      h5 {
        font-size: 19px;
        font-weight: bold;
      }
      button {
        margin-left: 1rem;
      }
    }

    .announcement {
      background: white;
      border-radius: 5px;
      box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.2);
      height: 100%;

      .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0.7rem;
        header {
          h5 {
            font-size: 17px;
            line-height: 115%;
            font-weight: bold;
            text-transform: capitalize;
            text-align: left;
          }
          hr {
            margin: 0.2rem 0 0.3rem;
            background: #d6d6d6;
          }
        }
        p {
          margin: 0 0 0.5rem;
          font-size: 16px;
          color: #636363;
          line-height: 120%;
        }
        button {
          align-self: flex-end;
        }
      }
      .img {
        height: 120px;
        background: #23063e;
        display: flex;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        img {
          height: 100%;
          width: 50px;
          margin: auto;
        }
      }
    }
  }
}
</style>