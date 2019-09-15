<template>
  <aside class="mr-2">
    <b-nav vertical>
      <router-link v-for="(item, index) in items" :key="index" :to="item.url">{{ item.name}}</router-link>
    </b-nav>
  </aside>
</template>

<script>
  import SidebarItems from "../models/sidebar/SidebarItems";

  export default {
    props: {
      items: {
        type: Array,
        default: () => SidebarItems
      }
    },
    name: 'Sidebar',
  }
</script>

<style scoped>

</style>
