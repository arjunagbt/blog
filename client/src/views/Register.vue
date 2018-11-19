<template>
  <div class="register">
    <h1>Register</h1>
    <div class="form-group">
      <label for="registerInputName1">Name</label>
      <input type="text" class="form-control" id="registerInputName1" aria-describedby="namelHelp" v-model="name" placeholder="Enter your name">
    </div>
    <div class="form-group">
      <label for="registerInputEmail1">Email address</label>
      <input type="email" class="form-control" id="registerInputEmail1" aria-describedby="emailHelp" v-model="email" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="registerInputPassword1">Password</label>
      <input type="password" class="form-control" id="registerInputPassword1" v-model="password" placeholder="Password">
    </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/users/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(data => {
          this.name = ''
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
