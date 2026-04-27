<script setup lang="ts">
import { experiences } from "@/data/index";
import { formatDate, diffDate } from "@/utils/date";

const maxId = Math.max(...experiences.map((e) => e.exp_id));
</script>

<template>
  <section>
    <ol class="relative border-s border-default">
      <li v-for="(item, i) in experiences" :key="i" class="mb-10 ms-6">
        <span
          class="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer"
        >
          <svg
            class="w-3 h-3 text-fg-brand-strong"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
            />
          </svg>
        </span>
        <div class="flex items-center gap-2 text-xs">
          <time
            class="bg-neutral-secondary-medium border border-default-medium text-heading font-medium px-1.5 py-0.5 rounded"
            v-html="formatDate(item.start_date)"
          ></time>

          <span class="text-body">—</span>

          <time
            class="bg-neutral-secondary-medium border border-default-medium text-heading font-medium px-1.5 py-0.5 rounded"
            v-html="formatDate(item.end_date)"
          ></time>
          <span class="text-body text-xs opacity-70">
            · {{ diffDate(item.start_date, item.end_date) }}
          </span>
        </div>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-heading my-2"
        >
          {{ item.role }}
          <span
            v-if="Number(item.exp_id) === maxId"
            class="ms-2 bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded"
          >
            Latest
          </span>
        </h3>
        <h4 class="text-body">{{ item.company }}</h4>
        <ul
          class="mb-4 list-disc ms-5 text-body space-y-1 text-sm"
        >
          <li v-for="(point, i) in item.summary" :key="i">
            {{ point }}
          </li>
        </ul>
        <!--         
        <a
          href="#"
          class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          <svg
            class="w-4 h-4 me-1.5 -ms-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-4 1h.01v.01H15V5Zm-2 2h.01v.01H13V7Zm2 2h.01v.01H15V9Zm-2 2h.01v.01H13V11Zm2 2h.01v.01H15V13Zm-2 2h.01v.01H13V15Zm2 2h.01v.01H15V17Zm-2 2h.01v.01H13V19Z"
            />
          </svg>
          Download ZIP
        </a> 
        -->
      </li>
    </ol>
  </section>
</template>

<style></style>
