<template>
  <header class="jumbotron">
    <my-gallery></my-gallery>
  </header>
</template>

<script>
import UserService from '../services/user.service';
import Gallery from '../components/Gallery.vue'
export default {
  name: 'Home',
  components:{
    'my-gallery' : Gallery,
  }
};
</script>
