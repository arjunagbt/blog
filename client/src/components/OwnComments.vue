<template>
  <div>
    <div class="listgroup">
      <div v-for="comment in comments" :key="comment._id" class="list-group-item">
        <router-link :to="`/articles/${comment.article._id}`" class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Comment on article '{{comment.article.title}}'</h5>
            <small>{{comment.createdAt}}</small>
          </div>
          <p class="mb-1">{{comment.comment_body}}</p>
        </router-link>
        <button class="btn btn-danger" @click= "deletecomment(comment._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'own-comments',
  props: ['triggerCom'],
  data () {
    return {
      comments: []
    }
  },
  methods: {
    deletecomment (id) {
      if (confirm('Are you sure you want to delete this comment?')) {
        axios.delete(`http://blog-server.arjunagbt.icu/comments/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$emit('deletedComment', response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  watch: {
    triggerCom () {
      axios.get('http://blog-server.arjunagbt.icu/comments/myComments', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.articles = response.data.result
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    axios.get('http://blog-server.arjunagbt.icu/comments/myComments', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.comments = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
