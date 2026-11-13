import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ExperiencePage from '../pages/ExperiencePage.vue'
import SkillsPage from '../pages/SkillsPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ProjectDetailPage from '../pages/ProjectDetailPage.vue'
import ResumePage from '../pages/ResumePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/experience', component: ExperiencePage },
  { path: '/skills', component: SkillsPage },
  { path: '/contact', component: ContactPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/projects/:slug', component: ProjectDetailPage },
  { path: '/resume', component: ResumePage },
  // old demo links
  { path: '/demo/projects/:slug', redirect: (to: { params: { slug?: string | string[] } }) => `/projects/${to.params.slug}` },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
