<script setup lang="ts">
import { ref } from 'vue'
import ProfileImage from "./ui/ProfileImage.vue";
import ProfileCard from "./objects/ProfileCard.vue";

const showModal = ref(false);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
</script>

<template>
  <header class="flex items-center justify-between gap-4">
    <ProfileCard :onClick="openModal" />
    <!-- Modal: outside the card container -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <ProfileImage
          alt="Profile full"
          class="rounded-xl shadow-lg object-cover max-w-full max-h-[50vh]"
        />
      </div>
    </transition>
  </header>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
