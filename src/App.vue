<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
    <v-toolbar-title href class="navbar-brand" @click.prevent>Camagru</v-toolbar-title>
      <v-toolbar-items>
          <v-btn text to="/" >
            Home
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn v-if="currentUser" to="/montage" >Montage</v-btn>

          <v-btn text v-if="!currentUser" to="/register">
            Register
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>

          <v-btn text v-if="!currentUser" to="/login">
            Login
            <v-icon>mdi-login</v-icon>
          </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="currentUser" to="/profile" >
          <v-icon>mdi-account</v-icon>
            {{ currentUser.username }}
        </v-btn>
        <v-btn href v-if="currentUser" @click.prevent="logOut">
          <v-icon icon="mdi-logout">LogOut</v-icon>
        </v-btn>
    </v-toolbar-items>
    </v-app-bar>
    <v-main>

      <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      test : 0
    }
  },
  computed: {
  currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.commit('auth/logout');
      this.$router.push('/login');
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>