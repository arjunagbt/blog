<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <articlesList />
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import articlesList from '@/components/ArticlesList.vue'
export default {
  name: 'home',
  data () {
    return {
      tesdata: [{
        _id: 'qwerty1',
        title: 'artikel satu'
      }, {
        _id: 'werty2',
        title: 'artikel dua'
      }, {
        _id: 'ertyu3',
        title: 'artikel tiga'
      }, {
        _id: 'rtyui4',
        title: 'artikel empat'
      }]
    }
  },
  components: {
    articlesList
  }
}
</script>
