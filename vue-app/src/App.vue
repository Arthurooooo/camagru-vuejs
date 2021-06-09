<template>
 <div>
   <my-header></my-header>
   <gallery></gallery>
   <v-img src="assets/culture1.jpg" />
   <camera></camera>
 </div>
</template>

<script>
import Header from './components/Header'
import Gallery from './components/Gallery'
import Camera from './components/Camera'
  export default {
    name: 'App',
     components: {
         'my-header':Header,
         'gallery':Gallery,
         'camera':Camera,
         'v-img' :'v-img'
     }
  }
</script>

<style>
  *{
      box-sizing:border-box;
      margin:10;
  }
</style>
