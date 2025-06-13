<template>
    <div class="flex items-end justify-between mb-8">
      <div>
        <p class="font-opensans font-regular text-fs-14 leading-lh-16 text-text-grey-2 mb-2">Available balance</p>
        <p class="flex items-center gap-3 font-opensans font-bold text-fs-26 leading-lh-16 text-text-grey-2">
          <span class="py-1 px-3 bg-text-green rounded-lg text-white text-fs-13 leading-lh-18">S$</span>
          {{ formattedAmount(balance.toString()) }}
        </p>
      </div>
      <button class="flex items-center bg-text-blue-1 text-white font-opensans font-bold text-fs-13 leading-lh-18 px-3 py-2 rounded-sm cursor-pointer" @click="openModal">
        <img src="../assets/add.svg" class="w-4 h-4 mr-2"  />
        New card
      </button>
      <AddCardModal :show="showModal" @close="closeModal" @submit="addCard" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddCardModal from './AddCardModal.vue';
import type { CardDetail } from '@/TypeDefs';

const props = defineProps<{
  balance: number;
  addCardData: (category: string, card: CardDetail) => Promise<void>;
}>();

const formattedAmount = (amount: string) => {
  if (!amount) return ''
  const num = Number(amount.replace(/,/g, ''))
  return num.toLocaleString('en-IN')
}

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const addCard = (category: string, card: CardDetail) => {
  props.addCardData(category, card);
};
</script>