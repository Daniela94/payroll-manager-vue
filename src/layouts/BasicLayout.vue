<template>
  <div class="basic-layout">
    <Menu />
    <div class="ui container">
      <!-- en slot esta todo el hijo de basic layout -->
      <slot />
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu.vue"

export default {
  name: "BasicLayout",
  components: {
    Menu,
  }
}
</script>

<style>

</style>