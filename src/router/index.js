import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import publish from 'components/publish/publish'
import man from 'components/man/man'
import girl from 'components/girl/girl'
import variety from 'components/variety/variety'
import search from 'components/search/search'
import detail from 'components/detail/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: detail
        }
      ]
    },
    {
      path: '/publish',
      component: publish,
      children: [
        {
          path: ':id',
          component: detail
        }
      ]
    },
    {
      path: '/man',
      component: man,
      children: [
        {
          path: ':id',
          component: detail
        }
      ]
    },
    {
      path: '/girl',
      component: girl,
      children: [
        {
          path: ':id',
          component: detail
        }
      ]
    },
    {
      path: '/variety',
      component: variety,
      children: [
        {
          path: ':id',
          component: detail
        }
      ]
    },
    {
      path: '/search',
      component: search
    }
  ]
})
