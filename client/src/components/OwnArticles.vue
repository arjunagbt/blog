<template>
    <div>
      <div class="list-group">
        <div v-for="article in articles" :key="article._id" class="list-group-item">
          <router-link :to="'/articles/' + article._id" class="list-group-item list-group-item-action flex-column align-items-start" >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{article.title}}</h5>
              <small>{{article.createdAt}}</small>
            </div>
            <p class="mb-1">{{article.article_body.slice(0, 50)+'...'}}</p>
            <small>By: {{article.owner.name}}</small>
          </router-link>
          <router-link to="/dashboard/edit" class="btn btn-secondary" @click.native = "editArticleStart(article)">Edit</router-link><button class="btn btn-danger" @click= "deleteArticle(article._id)">Delete</button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'own-articles',
  props: ['triggerVal'],
  data () {
    return {
      articles: []
    }
  },
  methods: {
    editArticleStart (article) {
      this.$emit('editStart', article)
    },
    deleteArticle (id) {
      if (confirm('Are you sure you want to delete this article?')) {
        axios.delete(`http://blog-server.arjunagbt.icu/articles/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$emit('deletedArticle', response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  watch: {
    triggerVal () {
      axios.get('http://blog-server.arjunagbt.icu/articles/myArticles', {
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
  created () {
    axios.get('http://blog-server.arjunagbt.icu/articles/myArticles', {
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
}
</script>
