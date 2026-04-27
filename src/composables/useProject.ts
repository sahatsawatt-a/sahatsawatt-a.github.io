import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '@/data/index'
import ProjectDetailEtl from '@/components/project/detail/ProjectDetailEtl.vue'
import ProjectDetailDefault from '@/components/project/detail/ProjectDetailDefault.vue'

const templateMap: Record<string, unknown> = {
  etl: ProjectDetailEtl,
  default: ProjectDetailDefault,
}

export function useProject() {
  const route = useRoute()

  const project = computed(() =>
    projects.find(p => p.slug === route.params.slug)
  )

  const templateComponent = computed(() => {
    if (!project.value) return null
    return templateMap[project.value.template] ?? ProjectDetailDefault
  })

  return { project, templateComponent }
}
