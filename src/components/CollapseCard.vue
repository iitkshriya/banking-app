<template>
  <div class="rounded-lg shadow-card bg-white overflow-hidden">
    <div
      class="flex items-center justify-between p-4 cursor-pointer bg-powder-blue border border-cloud-white rounded-lg"
      @click="toggle"
      data-test="header"
    >
      <div class="flex items-center space-x-2">
        <img :src="icon" class="w-6 h-6"  />
        <span class="ml-3 font-opensans font-regular text-fs-14 leading-lh-18 tracking-normal text-text-blue-2">{{ label }}</span>
      </div>
      <img src="../assets/expand.svg" alt="Toggle"
        class="w-5 h-5"
        :class="{ 'hidden': isOpen, 'block': !isOpen }"  />
      <img src="../assets/collapse.svg" alt="Toggle"
        class="w-5 h-5"
        :class="{ 'block': isOpen, 'hidden': !isOpen }"  />
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="bg-white">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ icon: string, label: string }>()

const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.shadow-card {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04); /* #0000000A */
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
