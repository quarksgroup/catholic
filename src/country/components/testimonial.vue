<template functional>
  <div class="testimonial">
    <header>{{props.testimonial.title}}</header>
    <p class="description">{{props.testimonial.message}}</p>
    <b-button class="is-primary is-small">Read More...</b-button>
  </div>
</template>


<style lang="scss">
.testimonial {
  width: fit-content;
  background: white;
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 0 1px 4px 0 rgba(32, 33, 36, 0.28);
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  header {
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }

  .description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    line-height: 135%;
    font-size: 15px;
    opacity: 0.9;
  }
  button {
    width: fit-content;
    margin-left: auto;
    margin-top: 1rem;
  }
}
</style>