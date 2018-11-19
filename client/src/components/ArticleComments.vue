<template>
   <div class="list-group">
      <div v-for="(comment, index) in comments" :key="index">
        <div class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{comment.title}}</h5>
            <small>{{comment.createdAt}}</small>
          </div>
          <p class="mb-1">{{comment.comment_body}}</p>
          <small>By: {{comment.owner.name}}</small>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'commentListTop',
  props: ['triggerVal'],
  data () {
    return {
      comments: []
    }
  },
  watch: {
    triggerVal () {
      axios.get(`http://localhost:3000/comments/${this.$route.params.id}`)
        .then(response => {
          this.comments = response.data.result
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    axios.get(`http://localhost:3000/comments/${this.$route.params.id}`)
      .then(response => {
        this.comments = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
