<template functional>
  <b-dropdown aria-role="list" class="__custom-dropdown" position="is-bottom-right">
    <i class="fa fa-ellipsis-v ellipsis" slot="trigger" />
    <b-dropdown-item
      aria-role="listitem"
      v-for="(dropdown,i) in props.dropdowns"
      :key="i"
      @click="dropdown.action(dropdown)"
    >{{dropdown.name}}</b-dropdown-item>
  </b-dropdown>
</template>
<style lang="scss">
.__custom-dropdown {
  .dropdown-menu {
    box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.23);
    padding: 0;
    border: 2px solid #dbdbdb;
  }
  .dropdown-content {
    padding: 0;
    border-radius: 1px;

    .dropdown-item {
      color: inherit;
      font-family: inherit;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      transition: all 0.3s ease;
      background: ghostwhite;
      font-size: 0.9rem;
      font-weight: bold;
      letter-spacing: 1px;

      &:hover {
        background-color: blueviolet;
        color: #fff;
      }
    }
  }
}
</style>