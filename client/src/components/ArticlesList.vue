<template>
   <div class="list-group">
      <div v-for="article in articles" :key="article._id">
        <router-link :to="'/articles/' + article._id" class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{article.title}}</h5>
            <small>{{article.createdAt}}</small>
          </div>
          <p class="mb-1">{{article.article_body.slice(0, 50)+'...'}}</p>
          <small>By: {{article.owner.name}}</small>
        </router-link>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'articlesList',
  data () {
    return {
      articles: []
    }
  },
  created () {
    axios.get('http://blog-server.arjunagbt.icu/articles')
      .then(response => {
        this.articles = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
