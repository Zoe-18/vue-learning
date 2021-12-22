<template>
  <div>
    <p>这是一个大的 Demo</p>
    <hello-world></hello-world>
    <search-bar></search-bar>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from './components/SearchBar.vue'
export default {
  components: {
    HelloWorld,
    SearchBar
  }
}
</script>

<style>

</style>