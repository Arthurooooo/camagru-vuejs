<template>
  <div class="container">
    <header class="jumbotron">
 <my-gallery></my-gallery>
 </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import Gallery from '../components/Gallery.vue'

export default {
  name: 'Home',
  components:{
    'my-gallery' : Gallery,
  },
  data() {

  },
  mounted() {

  }
};
</script>