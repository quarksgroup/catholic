<template functional>
  <div class="announcement">
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
</template>

<style lang="scss">
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
</style>