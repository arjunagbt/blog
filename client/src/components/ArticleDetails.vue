<template>

      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <h3>{{article.title}}</h3>
          <p>{{article.article_body}}</p>
          <hr>
          <CommentForm @commentAdded = "refreshComments"></CommentForm>
          <comments :triggerVal = "commentList"></comments>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import comments from '@/components/ArticleComments.vue'
import CommentForm from '@/components/CommentForm.vue'
export default {
  name: 'ArticleDetail',
  components: { comments, CommentForm },
  data () {
    return {
      article: {},
      commentList: {}
    }
  },
  methods: {
    refreshComments (data) {
      this.commentList = data
    }
  },
  created () {
    axios.get(`http://blog-server.arjunagbt.icu/articles/${this.$route.params.id}`)
      .then(response => {
        this.article = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
