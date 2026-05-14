import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ExperiencePage from '../pages/ExperiencePage.vue'
import SkillsPage from '../pages/SkillsPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ProjectDetailPage from '../pages/ProjectDetailPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/experience', component: ExperiencePage },
  { path: '/skills', component: SkillsPage },
  { path: '/contact', component: ContactPage },
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
