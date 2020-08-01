<template>
  <section class="request-info">
    <header>
      <div class="name">{{request.name}}</div>
      <div class="phone">{{request.phone}}</div>
    </header>
    <div class="request-content">{{request.content}}</div>
  </section>
</template>

<script>
export default {
  name: "Testimonial-request-component",
  props: {
    request: Object,
  },
};
</script>

<style lang="scss">
.request-info {
  display: grid;
  grid-template-rows: 3rem 1fr;
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.23);
  border-radius: 3px;
  height: 100%;

  & > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background: blueviolet;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .request-content {
    padding: 1rem;
  }
}
</style>