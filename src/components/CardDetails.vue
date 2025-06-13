<template>
  <div
    class="w-full p-4 bg-white rounded-b-lg border-x border-b border-pale-gray text-text-grey-2 font-opensans"
  >
    <div class="text-sm text-gray-600 mt-1">Freeze Status: {{ card.freezeStatus }}</div>
    <div class="text-sm text-gray-600">Active Status: {{ card.active }}</div>
    <div class="text-sm text-gray-600">Card Limit: {{ card.limit }}</div>
  </div>
</template>

<script setup lang="ts">
import { type CardDetail } from '@/TypeDefs'

defineProps<{ card: CardDetail }>()
</script>
