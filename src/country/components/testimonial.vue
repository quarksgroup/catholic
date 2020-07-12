<template functional>
  <div class="testimonial">
    <header class="title">{{props.testimonial.title}}</header>
    <p class="description">{{props.testimonial.body}}</p>
    <b-button class="is-primary is-small">Read More...</b-button>
  </div>
</template>


<style lang="scss">
.testimonial {
  width: 100%;
  background: #ffffff;
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.09);
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  header.title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
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
    padding: 1rem 0.75rem;
    font-size: 0.9rem !important;
  }
}
</style>