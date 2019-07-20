import Vue from 'vue'
import Router from 'vue-router'
import post from './components/page/post.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'post',
      component: post
    }
  ]
})
