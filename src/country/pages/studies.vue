<template>
  <div class="studies-dashboard">
    <header>
      <h5>Inyigisho zose</h5>
      <b-button class="is-primary no-b-radius" @click="$modal.show('add-study')">
        <i class="fa fa-plus" /> Add inyigisho
      </b-button>
    </header>
    <div class="studies">
      <div class="study" v-for="i in 11" :key="i">
        <div class="video">
          <i class="fa fa-play-circle" />
        </div>
        <div class="description">
          <div class="study-title">
            <h5>Inyigisho ya {{i}}</h5>
          </div>
          <div class="study-subtitle">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, nobis.</p>
          </div>
          <b-button class="is-small is-primary">Read more...</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.studies-dashboard {
  & > header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #999;
    padding: 0.5rem 0;
    h5 {
      font-size: 18px;
      text-transform: capitalize;
      font-weight: bold;
    }
  }
  & > .studies {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
    justify-content: space-between;
    .study {
      background: white;
      box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.23);
      border-radius: 3px;
      margin: 1.5rem 1rem;
      flex: 1;
      flex-basis: 250px;
      min-width: 250px;
      max-width: 350px;

      .video {
        min-height: 200px;
        background: #23063e;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 400%;
          color: white;
        }
      }
      .description {
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .study-title {
          h5 {
            font-size: 18px;
            font-weight: bold;
            text-transform: capitalize;
          }
        }
        .study-subtitle {
          margin-bottom: 10px;
          p {
            color: #525252;
            line-height: 120%;
          }
        }
        button {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>