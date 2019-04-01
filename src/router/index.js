import Vue from 'vue'
import VueRouter from 'vue-router'
import exhibition from './exhibition'
Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  routes: [
    ...exhibition
  ]
})

export default router