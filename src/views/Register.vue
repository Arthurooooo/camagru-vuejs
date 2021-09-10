<template>
  <div class="col-md-12">
    <div class="card card-container">
    <v-form ref="form" v-model="valid" @submit.prevent="register">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        name="username"
        v-model="username"
        label="username"
        placeholder="username">
      </v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required]"
        type="password"
        label="Password"
      ></v-text-field>
      <v-alert v-if="autherror"
        dense
        type="error"
      >
        {{this.errors}}
      </v-alert>
      <v-btn
        :disabled="!valid || loading"
        color="success"
        :loading="loading"
        class="mr-4"
        @click="register"
      >
      Register
        </v-btn>
  </v-form>
      <div
        v-if="message"
        :class="['alert', successful ? 'alert-success' : 'alert-danger']"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
//import User from '../models/user';
import axios from 'axios'

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
      errors: '',
      autherror: false,
      loading: false,
      valid: false,
      show: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: {
          required: value => !!value || 'Required.',
        },
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

    register() {
      this.loading = true;
      const { username, email, password } = this;
      axios.post("http://localhost:8080/api/signup", {
            username:username,
            email:email,
            password:password

          }).then(res => {
            this.loading = false,
            console.log('no error' + res),
            this.$router.push('/profile').catch(() => {})
          }
          ).catch(error => {
            this.loading = false
            console.log(error.response.data.message);
            this.autherror = true
            this.errors = error.response.data.message;
          });
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