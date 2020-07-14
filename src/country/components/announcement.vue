<template functional>
  <div class="announcement">
    <div class="img no-select">
      <img src="../../assets/img/notify.svg" alt="notify_image" />
    </div>
    <div class="description">
      <header>
        <h5>{{props.announcement.title}}</h5>
        <hr class="hr" />
      </header>
      <p>{{props.announcement.body}}</p>
    </div>
    <i class="fa fa-ellipsis-v" />
  </div>
</template>

<style lang="scss">
.announcement {
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.2);
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  position: relative;

  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0.75rem;
    height: 100%;
    flex: 3;
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
      flex: 1;
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
  .img {
    height: 2.5rem;
    max-height: 2.5rem;
    width: 2.5rem;
    max-width: 2.5rem;
    background: #8a2be2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    img {
      height: 50%;
      width: 60%;
      margin: auto;
    }
  }
  i {
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.75rem 0.25rem;
    transition: all 0.3s ease;

    &:hover {
      background: #8a2be21c;
    }
  }
}
</style>