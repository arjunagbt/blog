<template>
  <div class="mb-3">
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Comment on this post:</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Your Comment Here" v-model= "comment_body" ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click = "createComment">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      comment_body: ''
    }
  },
  methods: {
    createComment () {
      axios.post(`http://blog-server.arjunagbt.icu/comments/${this.$route.params.id}`, {
        comment_body: this.comment_body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$emit('commentAdded', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
