<template>
  <div id="app">
    <div id="nav" v-if = "!login">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/chat">LiveChat</router-link>
    </div>
    <div id="nav" v-else>
      <router-link to="/">Home</router-link> |
      <router-link to="/articles">Articles</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/chat">LiveChat</router-link> |
      <a href="#" @click = "logout">Log out</a>
    </div>
    <router-view @isLogin = "login = true"/>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  data () {
    return {
      login: false
    }
  },
  methods: {
    logout (event) {
      event.preventDefault()
      this.login = false
      localStorage.removeItem('token')
      this.$router.replace({
        path: '/'
      })
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.login = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
