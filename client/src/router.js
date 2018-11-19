import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "about" */ './views/LiveChat.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import(/* webpackChunkName: "about" */ './views/Articles.vue'),
      children: [{
        path: '',
        name: 'articleListTop',
        component: () => import(/* webpackChunkName: "about" */ './components/ArticleListTop.vue')
      }, {
        path: ':id',
        name: 'ArticleDetail',
        component: () => import(/* webpackChunkName: "about" */ './components/ArticleDetails.vue')
      }]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      children: [{
        path: '',
        name: 'own-list',
        component: () => import(/* webpackChunkName: "about" */ './components/OwnArticles.vue')
      }, {
        path: 'create',
        name: 'create-article',
        component: () => import(/* webpackChunkName: "about" */ './components/CreateArticle.vue')
      }, {
        path: 'edit',
        name: 'edit-article',
        component: () => import(/* webpackChunkName: "about" */ './components/EditArticle.vue')
      }, {
        path: 'comments',
        name: 'own-comments',
        component: () => import(/* webpackChunkName: "about" */ './components/OwnComments.vue')
      }]
    }
  ]
})
