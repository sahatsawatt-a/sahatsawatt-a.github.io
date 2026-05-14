import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects, type Project } from '@/data/index'

export function useProject() {
  const route = useRoute()

  const project = computed<Project | undefined>(() =>
    projects.find(p => p.slug === route.params.slug),
  )

  return { project }
}
