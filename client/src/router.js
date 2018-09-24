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
      component: Home,
      children: [
        {
          path: '/',
          name: 'ArticleCard',
          component: () => import('./components/Article/ArticleCard.vue')
        },
        {
          path: '/:id',
          name: 'DetailArticle',
          component: () => import('./components/Article/DetailArticle.vue')
        }
      ]
    },
    {
      path: '/myarticle',
      name: 'MyArticle',
      component: () => import('./views/MyArticle.vue'),
      children: [
        {
          path:'/myarticle/me',
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
