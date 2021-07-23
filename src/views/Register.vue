<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
    <form @submit.prevent="register">
      <div>
        <label for="username">username</label>
        <input name="username" v-model="username" placeholder="username">
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <div>
        <label for="email">email</label>
        <input name="email" v-model="email" placeholder="email">
      </div>
      <input type="submit" value="register">
    </form>

      <div
        v-if="message"
        :class="['alert', successful ? 'alert-success' : 'alert-danger']"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
//import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      submitted: false,
      successful: false,
      message: '',
      errors: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {

    async register() {
      const { username, email, password } = this;
      const res = await fetch(
        "http://localhost:8080/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password

          })
        }
      );
      const data = await res.json();
      console.log(data);
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>