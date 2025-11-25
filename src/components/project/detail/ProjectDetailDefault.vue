<!-- src/components/project/detail/ProjectDetailDefault.vue -->
<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="space-y-8">
    <header>
      <h1 class="text-3xl font-semibold text-slate-50">
        {{ props.project.title }}
      </h1>
      <p class="text-slate-400 mt-2 text-sm md:text-base">
        {{ props.project.description }}
      </p>

      <div class="flex flex-wrap gap-2 text-xs text-slate-300 mt-4">
        <span
          v-for="tag in props.project.tags || []"
          :key="tag"
          class="px-2.5 py-1 rounded-full border border-slate-700"
        >
          {{ tag }}
        </span>
      </div>
    </header>

    <section v-if="props.project.highlights?.length" class="space-y-3">
      <h2 class="text-xl font-medium text-slate-100">Highlights</h2>
      <ul class="list-disc list-inside text-slate-300 space-y-1">
        <li v-for="item in props.project.highlights" :key="item">
          {{ item }}
        </li>
      </ul>
    </section>
  </section>
</template>
