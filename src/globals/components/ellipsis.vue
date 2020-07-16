<template functional>
  <b-dropdown aria-role="list" class="__custom-dropdown" position="is-bottom-left">
    <i class="fa fa-ellipsis-v ellipsis" slot="trigger" />
    <b-dropdown-item
      aria-role="listitem"
      v-for="(dropdown,i) in props.dropdowns"
      :key="i"
      @click="dropdown.action()"
    >{{dropdown.name}}</b-dropdown-item>
  </b-dropdown>
</template>
<style lang="scss">
.__custom-dropdown {
  .dropdown-content {
    padding: 0;
    border-radius: 1px;

    .dropdown-item {
      color: inherit;
      font-family: inherit;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      transition: all 0.3s ease;

      &:hover {
        background-color: blueviolet;
        color: #fff;
      }
    }
  }
}
</style>