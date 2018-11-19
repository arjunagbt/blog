<template>
  <div class="create-article col">
    <h1>Submit a new Article</h1>
    <div class="form-group">
      <label for="formGroupExampleInput">Article Title</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Article Title" v-model="title">
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Article Body</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Article Body" v-model= "article_body" ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click = "createArticle">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'create-article',
  data () {
    return {
      title: '',
      article_body: ''
    }
  },
  methods: {
    createArticle () {
      axios.post('http://blog-server.arjunagbt.icu/articles', {
        title: this.title,
        article_body: this.article_body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$emit('submitArticle', response.data.result)
          this.$router.replace({ path: '/dashboard' })
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
