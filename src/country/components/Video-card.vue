<template functional>
  <div class="study">
    <div class="video">
      <i class="fa fa-play-circle" />
    </div>
    <div class="description">
      <div class="study-title">
        <h5>{{props.video.title}}</h5>
      </div>
      <div class="study-subtitle">
        <p>{{props.video.body}}</p>
      </div>
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
        font-size: 1.15rem;
        font-weight: bold;
      }
    }
    .study-subtitle {
      margin-bottom: 0.75rem;
      p {
        color: #525252d6;
        line-height: 140%;
        font-size: 0.85rem;
      }
    }
    button {
      align-self: flex-end;
      width: fit-content;
      margin-left: auto;
      margin-top: 1rem;
      padding: 1rem 0.75rem;
      font-size: 0.9rem !important;
    }
  }
}
</style>