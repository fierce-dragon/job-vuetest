import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Games',
    component: () =>
      import(/* webpackChunkName: 'games' */ '../views/Games.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () =>
      import(/* webpackChunkName: 'contact' */ '../views/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(() => {
  window.scrollTo(0, 0)
})

export default router
