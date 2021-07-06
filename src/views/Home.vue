<template>
 <div>
   <my-header></my-header>
   <gallery></gallery>
   <camera></camera>
 </div>
</template>

<script>
import Header from '../components/Header'
import Gallery from '../components/Gallery'
import Camera from '../components/Camera'
  export default {
    name: 'App',
     components: {
         'my-header':Header,
         'gallery':Gallery,
         'camera':Camera
         }
  }
</script>