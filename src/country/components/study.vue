<template functional>
  <div class="study">
    <div class="video">
      <i class="fa fa-play-circle" />
    </div>
    <div class="description">
      <div class="study-title">
        <h5>Inyigisho ya {{props.i}}</h5>
      </div>
      <div class="study-subtitle">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, nobis. adipisicing elit. Ex, nobis.</p>
      </div>
      <button class="button is-primary br-1">Read more...</button>
    </div>
  </div>
</template>


<style lang="scss">
.study {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.23);
  border-radius: 3px;

  .video {
    min-height: 150px;
    background: #23063e;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    i {
      font-size: 300%;
      color: white;
    }
  }
  .description {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .study-title {
      margin-bottom: 0.65rem;
      h5 {
        font-size: 1.25rem;
        font-weight: bold;
      }
    }
    .study-subtitle {
      margin-bottom: 0.75rem;
      p {
        color: #525252;
        line-height: 130%;
        font-size: 1rem;
      }
    }
    button {
      align-self: flex-end;
      height: 2rem;
      width: 6.5rem;
      font-size: 0.9rem;
    }
  }
}
</style>