<template>

  <div class="dashboard">
    <div class="row">
      <div class="col mb-3">
        <div class="row">
          <img :src="imgsrc" alt="profpic">
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row">
              <router-link to = "/dashboard/create">Create an Article!</router-link>
            </div>
            <div class="row">
              <router-link to = "/dashboard">Your Articles</router-link>
            </div>
            <div class="row">
              <router-link to = "/dashboard/comments">Your Comments</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <h1>Welcome Back {{user.name}}</h1>
        <hr>
        <router-view @submitArticle= "refreshArticles" @editArticle= "refreshArticles" @editStart="openEditWindow" @deletedArticle="refreshArticles" @deletedComment="refreshComment" :triggerVal = "newValue" :triggerCom = "newCom" :articleEdit = "articleEdit" />
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'dashboard',
  data () {
    return {
      imgsrc: 'https://www.britishfarmingawards.co.uk/wp-content/uploads/2017/06/Avatar-300x300px.jpg',
      user: {},
      newValue: {},
      newCom: {},
      articleEdit: ''
    }
  },
  methods: {
    refreshArticles (value) {
      this.newValue = value
    },
    refreshComment (value) {
      this.newCom = value
    },
    openEditWindow (article) {
      this.articleEdit = article
    }
  },
  mounted () {
    axios.get('http://localhost:3000/users/profile', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.user = response.data.result
        if (this.user.imgsrc) {
          this.imgsrc = this.user.imgsrc
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
