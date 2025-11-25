<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
})

const router = useRouter()
</script>

<template>
    <section class="space-y-10">
        <RouterLink to="/projects"
  class="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-900/80 text-sm text-[#FF2D20] font-medium shadow-sm transition hover:bg-[#FF2D20]/10 hover:text-[#FF543E] mb-5">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back to Project Lists
</RouterLink>


        <!-- HEADER -->
        <header>
            <h1 class="text-3xl font-semibold text-slate-50">
                {{ props.project.title }}
            </h1>
            <p class="text-slate-400 mt-2 text-sm md:text-base">
                {{ props.project.description }}
            </p>

            <div class="flex flex-wrap gap-2 text-xs text-slate-300 mt-4">
                <span v-for="tag in props.project.tags" :key="tag"
                    class="px-2.5 py-1 rounded-full border border-slate-700">
                    {{ tag }}
                </span>
            </div>
        </header>

        <!-- IMAGE -->
        <div v-if="props.project.img"
            class="max-w-2xl mx-auto rounded-xl overflow-hidden border border-slate-800 shadow-lg">
            <img :src="props.project.img" :alt="props.project.title" class="w-full object-contain" />
        </div>

        <!-- PURPOSE -->
        <section v-if="props.project.purpose?.length" class="space-y-3">
            <h2 class="text-xl font-medium text-slate-100">🎯 Purpose</h2>
            <ul class="list-disc list-inside text-slate-300 space-y-1">
                <li v-for="item in props.project.purpose" :key="item">
                    {{ item }}
                </li>
            </ul>
        </section>

        <!-- PACKAGE -->
        <section v-if="props.project.package?.length" class="space-y-3">
            <h2 class="text-xl font-medium text-slate-100">📦 Package Used</h2>
            <div class="flex flex-wrap gap-2">
                <span v-for="item in props.project.package" :key="item"
                    class="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200 text-sm shadow-sm">
                    {{ item }}
                </span>
            </div>
        </section>

        <!-- FEATURES -->
        <section v-if="props.project.features?.length" class="space-y-3">
            <h2 class="text-xl font-medium text-slate-100">📌 Features</h2>
            <ul class="list-disc list-inside text-slate-300 space-y-1">
                <li v-for="item in props.project.features" :key="item">
                    {{ item }}
                </li>
            </ul>
        </section>

        <!-- FEEDBACK -->
        <section v-if="props.project.feedback" class="space-y-3">
            <h2 class="text-xl font-medium text-slate-100">🌟 Feedback</h2>
            <blockquote class="text-slate-300 italic border-l-4 border-[#FF2D20] pl-4">
                “{{ props.project.feedback }}”
            </blockquote>
        </section>
    </section>
</template>
