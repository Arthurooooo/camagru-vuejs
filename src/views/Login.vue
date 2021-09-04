<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form @submit.prevent="login">
      <div>
        <label for="email">email</label>
        <input name="email" v-model="email" placeholder="email">
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
        <v-alert v-model="alert" type="error"></v-alert>
      <input type="submit" value="login">
    </form>
    </div>
  </div>
</template>

<script>
//import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      message: '',
      loggedin: false,
      alert: true
    };
  },
  computed: {

  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {

    async login() {
      console.log('logging in')
      const { email, password } = this;
      const res = await fetch(
        "http://localhost:8080/api/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )
      this.loading = true;
      const data = await res.json().then(data => {
        if (data.accessToken) {
          localStorage.setItem('user', JSON.stringify(data));
          this.$store.state.auth.status.loggedIn = true;
          this.$store.state.auth.user = data;
        }
      })
      this.loading = false;
      if(res.status == 200) {
        this.loggedin = true;
        this.$router.push('/profile');
      }
      else if (res.status == 401) {
        this.alert - true
      }
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