<template>
  <div v-if="!loading" class="relative overflow-hidden w-full max-w-3xl mx-auto">
    <div
      class="flex transition-transform duration-500 ease-in-out justify-around"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      ref="slider"
    >
      <div v-for="(slide, index) in slides" :key="slide.id" class="h-55 md:h-70 flex-none w-[100%]">
        <component :is="cardComponent" v-bind="cardProps" :activeIndex="index" />
      </div>
    </div>

    <div class="flex justify-center gap-2 mt-4" v-if="slides.length > 1">
      <span
        v-for="(_, index) in slides"
        :key="'dot' + index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full"
        :class="{
          'bg-text-green': currentSlide === index,
          'w-4': currentSlide === index,
          'bg-text-green/40': currentSlide !== index,
        }"
      ></span>
    </div>
  </div>
  <div v-else class="relative overflow-hidden w-full max-w-3xl mx-auto">
    <div class="flex justify-around">
      <div class="h-55 md:h-70 flex-none w-[100%]">
        <CardShimmer />
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <span
        v-for="(_, index) in [1, 2, 3]"
        :key="'dot' + index"
        class="w-2 h-2 rounded-full"
        :class="{
          'bg-text-green': index === 0,
          'w-4': index === 0,
          'bg-text-green/40': index !== 0,
        }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: string }">
import { onBeforeUnmount, onMounted, ref, type Component } from 'vue'
import CardShimmer from './CardShimmer.vue'

const props = defineProps<{
  slides: T[]
  cardComponent: Component
  loading: boolean
  cardProps: Record<string, any>
}>()

const currentSlide = ref<number>(0)
const totalSlides = props.slides.length
let startX = 0

const slider = ref<HTMLDivElement | null>(null)

const prevSlide = () => {
  if (props.loading) return
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

const nextSlide = () => {
  if (props.loading) return
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const goToSlide = (index: number) => {
  if (props.loading) return
  currentSlide.value = index
}

const startTouch = (e: TouchEvent) => {
  e.preventDefault()
  if (props.loading) return
  startX = e.touches[0].clientX
}

const moveTouch = (e: TouchEvent) => {
  e.preventDefault()
  if (props.loading) return
  const endX = e.touches[0].clientX
  const diff = startX - endX

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide()
    else prevSlide()
    startX = 0 // reset after swipe
  }
}

defineExpose({ currentSlide })
onMounted(() => {
  if (slider.value) {
    slider.value.addEventListener('touchstart', startTouch, { passive: true })
    slider.value.addEventListener('touchmove', moveTouch, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (slider.value) {
    slider.value.removeEventListener('touchstart', startTouch)
    slider.value.removeEventListener('touchmove', moveTouch)
  }
})
</script>
