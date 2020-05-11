<template>
  <div class="is-loading no-select">
    <img src="../../assets/img/black-spinner.svg" />
    <p>loading...</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.is-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  img {
    height: 60px;
  }
  p {
    font-weight: bold;
  }
}
</style>