import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BrowserList from '@/components/BrowserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BrowserList',
      component: BrowserList
    }
  ]
})
