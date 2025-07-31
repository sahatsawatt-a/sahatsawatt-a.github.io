import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Import your views
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Topics from '@/views/Topics.vue'
import Projects from '@/views/Projects.vue'
import TopicDetail from '@/views/TopicDetail.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import NotFound from '@/views/NotFound.vue'

// ✅ Typed route array
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/topics', name: 'Topics', component: Topics },
  {
    path: '/topics/:slug',
    name: 'TopicDetail',
    component: TopicDetail,
    props: true,
  },
  { path: '/projects', name: 'Projects', component: Projects },
  {
    path: '/projects/:slug',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
