<template>
  <div
    class="relative rounded-xl text-white p-6 h-full w-[95%] mt-7 mx-auto max-h-[248px]"
    :class="{
      'bg-text-green': !details.freezeStatus,
      'bg-text-green/40': details.freezeStatus,
      'cursor-not-allowed': details.freezeStatus,
    }"
  >
    <div
      class="absolute -top-7 right-0 bg-white text-text-green rounded-md pl-3 py-1 shadow md:shadow-none cursor-pointer flex items-center space-x-2"
      @click="toggleCardNumber"
    >
      <img src="../assets/showEye.svg" alt="Show card number" class="h-4 w-4" />
      <span class="font-opensans font-bold text-fs-12 leading-lh-20 tracking-wide"
        >Show card number</span
      >
    </div>

    <div class="absolute top-6 right-6">
      <img src="../assets/whiteLogoLarge.svg" alt="aspire logo" />
    </div>

    <div class="mt-12 text-fs-24 font-open-sans font-bold tracking-normal leading-lh-20">
      {{ details.name }}
    </div>

    <div
      class="flex items-center text-fs-14 font-open-sans font-bold tracking-wide leading-lh-19 mt-8 mb-5"
    >
      <span
        class="mr-7 flex justify-between w-13"
        v-for="(set, index) in [
          [0, 4],
          [4, 8],
          [8, 12],
          [12, 16],
        ]"
        :key="index"
      >
        <span
          v-for="i in details.number.slice(...set)"
          :key="i"
          :class="{
            'inline-block w-[8px] h-[8px] rounded-full bg-white': !showCard && index !== 3,
          }"
          >{{ showCard || index === 3 ? i : null }}</span
        >
      </span>
    </div>

    <div class="flex text-fs-13 font-open-sans font-bold tracking-[0.13px] leading-lh-18">
      <div>
        <span>Thru: </span>
        <span class="tracking-[1.56px]">{{ details.expiry }}</span>
      </div>
      <div class="mx-6">
        <span>CVV: </span>
        <span class="tracking-[2.88px]">{{ showCard ? details.cvv : '* * *' }}</span>
      </div>
    </div>

    <div class="absolute bottom-0 right-0 mb-6 mr-6">
      <img src="../assets/visa.svg" alt="Visa" class="h-6 inline-block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import type { CardDetail } from '@/TypeDefs'

const props = defineProps<{
  list: Ref<CardDetail[]>
  cardLoading: Ref<boolean>
  categoryId: string
  activeIndex: number
}>()

const details = computed(() => props.list.value[props.activeIndex])

const showCard = ref<boolean>(false)
const toggleCardNumber = () => {
  showCard.value = !showCard.value
}
</script>
