<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
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
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>