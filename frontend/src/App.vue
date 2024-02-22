<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../src/components/NavBar.vue"

export default {
  name: 'App',
  
  components: {
    NavBar,
  },
 

}

</script>

<style>

@import '@/assets/main.css';
@import '@/assets/light.css';
@import '@/assets/dark.css';
</style>
