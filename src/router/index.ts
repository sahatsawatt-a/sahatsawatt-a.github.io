import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ProjectDetailPage from '../pages/ProjectDetailPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/projects', component: ProjectsPage },
  { path: '/projects/:slug', component: ProjectDetailPage, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
