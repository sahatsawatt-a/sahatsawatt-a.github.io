<!-- src/layouts/MainLayout.vue -->
<script setup>
import { header, footer } from '../data/profile'
</script>

<template>
    <div class="min-h-screen bg-gray-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <!-- Background accents -->
        <div aria-hidden="true"
            class="pointer-events-none fixed inset-x-0 top-0 z-0 flex justify-center overflow-hidden">
            <div class="h-64 w-[40rem] -translate-y-1/2 rounded-full bg-[#FF2D20]/20 blur-3xl dark:bg-[#FF2D20]/30" />
        </div>

        <div class="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-6 lg:px-10 lg:pt-8">
            <!-- HEADER -->
            <header class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <RouterLink
                        :to="`/`"
                        class="flex size-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/80">
                        {{ header.initials }}
                    </RouterLink>

                    <div class="space-y-0.5">
                        <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            {{ header.name }}
                        </p>
                        <p class="text-sm text-slate-600 dark:text-slate-300">
                            {{ header.tagline }}
                        </p>
                    </div>
                </div>  

            </header>

            <!-- PAGE CONTENT -->
            <main class="mt-10 flex-1 space-y-20 lg:mt-14">
                <slot />
            </main>

            <!-- FOOTER -->
            <footer
                class="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                {{ footer.text }}
            </footer>
        </div>
    </div>
</template>
