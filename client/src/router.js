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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/myarticle',
      name: 'MyArticle',
      component: () => import('./views/MyArticle.vue'),
      children: [
        {
          path:'/myarticle',
          name: 'MyMyArticle',
          component: () => import('./components/Article/MyMyArticle.vue')
        },
        {
          path:'/myarticle/create',
          name: 'CreateArticle',
          component: () => import('./components/Article/CreateArticle.vue')
        },
        {
          path: '/myarticle/edit/:id',
          name: 'EditArticle',
          component: () => import('./components/Article/EditArticle.vue')
        },
        {
          path: '/myarticle/:id',
          name: 'DetailMyArticle',
          component: () => import('./components/Article/DetailMyArticle.vue')
        }
      ]
    },
  ]
})
