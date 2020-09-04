import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home'
import PrivacyPolicy from '../PrivacyPolicy.vue'
import ToC from '../ToC.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/terms-and-conditions',
      name: 'ToC',
      component: ToC
    }
  ]
})
