<template>
<div class="row my-auto">
    <div class="col-3">
      <router-link :to="'/articles'">All articles</router-link>
    </div>
    <router-view class="col-9"></router-view>
</div>

</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'articles'
}
</script>
