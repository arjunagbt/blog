<template>
  <div class="about">
    <h1>Log In</h1>
    <div class="form-group">
      <label for="loginInputEmail1">Email address</label>
      <input type="email" class="form-control" id="loginInputEmail1" aria-describedby="emailHelp" v-model="email" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="loginInputPassword1">Password</label>
      <input type="password" class="form-control" id="loginInputPassword1" v-model="password" placeholder="Password">
    </div>
      <button type="submit" class="btn btn-primary" @click = "loginSuccess">Log In</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginSuccess () {
      axios.post('http://blog-server.arjunagbt.icu/users/login', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.result.token)
          this.$emit('isLogin')
          this.email = ''
          this.password = ''
          this.$router.replace({
            path: '/'
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
