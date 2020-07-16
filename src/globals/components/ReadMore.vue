<template >
  <modal
    @before-open="beforeOpen"
    name="read-more"
    :clickToClose="false"
    scrollable
    height="auto"
    focusTrap
    reset
    adaptive
  >
    <section id="read-more-modal">
      <header class="bg-light">
        <h5>{{content.title}}</h5>
        <span @click="$modal.hide(`read-more`)">&times;</span>
      </header>
      <div class="description">
        <article>{{content.body}}</article>
      </div>
    </section>
  </modal>
</template>

<script>
export default {
  name: "read-more-component",

  data() {
    return {
      item: { title: "", body: "" }
    };
  },

  computed: {
    content() {
      return this.item;
    }
  },

  methods: {
    beforeOpen(event) {
      if (event.params.item) this.item = event.params.item;
    }
  }
};
</script>

<style lang="scss" scoped>
#read-more-modal {
  min-height: 200px;
  header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.2rem solid blueviolet;

    h5 {
      font-size: 1.15rem;
      font-weight: bold;
      flex: 1;
    }

    span {
      font-size: 1.75rem;
      font-weight: bold;
      cursor: pointer;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: inherit;
      transition: all 0.3s ease;

      &:hover {
        background: #0000001a;
      }
    }
  }
  .description {
    font-size: 1rem;
    color: inherit;
    padding: 1rem;
    article {
      line-height: 180%;
      letter-spacing: 1px;
      text-align: left;
    }
  }
}
</style>