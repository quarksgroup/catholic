<template>
  <div class="confirmation-wrapper modal-card">
    <header>Confirm before Delete</header>
    <article>
      Are you sure you want to delete
      <span>{{account.name || ''}}</span> Account?
      <br />
      <span>click yes to DELETE or no to CANCEL</span>
    </article>
    <div class="buttons">
      <button class="button" @click="$emit('canceled')">No</button>
      <button class="button is-danger" @click="$emit('delete',account)">Yes</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["account"],
};
</script>

<style lang="scss">
.confirmation-wrapper {
  background: white;
  width: fit-content;
  padding: 0.75rem 1.5rem;
  border-radius: 3px;

  & > header {
    font-size: 1.15rem;
    font-weight: bold;
  }

  & > article {
    margin: 0.75rem 0 1.75rem;
    & > span {
      font-weight: bold;
    }
  }
  & > .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      height: 2rem;
      padding: 0 1.25rem;
      margin-left: 0.6rem;
      font-size: 1rem;
      border-radius: 3px;
      transition: 0.2s linear;

      &:active {
        transform: translateY(2px);
      }
    }
  }
}
</style>