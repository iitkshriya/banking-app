<template>
  <div>
   
    <div class="flex gap-8">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="py-2 font-avenir text-fs-14 leading-lh-20 text-text-grey-2 relative"
        :class="[
          activeTab === index
            ? 'font-bold'
            : 'font-regular',
        ]"
      >
        {{ tab.label }}
        <span
          v-if="activeTab === index"
          class="absolute bottom-0 left-0 w-full h-[2px] bg-[#23CEFD] rounded-full"
        ></span>
      </button>
    </div>

    <div class="mt-4">
      <component :is="componentsList[tabs[activeTab].content as TabComponentsKeys]" v-bind="{...tabs[activeTab].props, activeTab: tabs[activeTab].id}" :key="tabs[activeTab].id" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="P">
import { ref, type Component } from 'vue';
import type { TabComponentsKeys, TabItem } from '@/TypeDefs';
import CardSection from './CardSection.vue';

const componentsList: Record<TabComponentsKeys, Component> = {
  "card_section": CardSection,
};


defineProps<{ tabs: TabItem<P>[] }>()

const activeTab = ref<number>(0)
</script>
