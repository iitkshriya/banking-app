<template>
  <div class="bg-mint-cream">

    <div class="py-1 px-6 rounded-b-lg border-x border-b border-pale-gray bg-white">
      <div v-for="(tx, index) in transactions.slice(0, 4)" :key="index" class="py-5 border-b border-[#F2F2F2] last:border-none flex gap-3 items-start">

        <div :class="['w-12 h-12 rounded-full flex items-center justify-center shrink-0', getExpenseBg(tx.expenseType)]" >
          <img :src="getExpenseIcon(tx.expenseType)" alt="icon" class="w-4 h-4" />
        </div>

        <div class="flex flex-col flex-1">
          <div class="flex justify-between items-center font-opensans font-semibold text-fs-14 leading-lh-18">
            <span class="text-text-grey-2">{{ tx.label }}</span>
            <span :class="[
              'flex items-baseline', 
              tx.status === 'credit' ? 'text-text-green' : 'text-text-grey-2'
            ]">
              <span>{{ tx.amount > 0 ? '+ ' : '- ' }}S$ {{ formattedAmount(tx.amount.toString()) }}</span>
              <img src="../assets/next.svg" alt="next" class="w-[6px] h-3 inline-block ml-2" />
            </span>
          </div>
          <div class="text-text-grey-1 font-opensans font-regular text-fs-13 leading-lh-18 mt-1">{{ tx.date }}</div>
          <div class="flex items-center mt-3 gap-2">
            <div class="w-6 h-5 rounded-full flex items-center justify-center bg-text-blue-1">
              <img src="../assets/smallCard.svg" class="w-[10px] h-[8px]" />
            </div>
            <span class="text-text-blue-1 font-opensans font-semibold text-fs-12 leading-lh-18">{{ tx.status === 'credit' ? 'Refund on debit card': 'Charged to debit card' }}</span>
          </div>
        </div>

      </div>
    </div>

    <div class="text-text-green bg-mint-cream text-center font-opensans font-semibold text-fs-13 leading-lh-18 py-4 cursor-pointer border-x border-b border-pastel-mint">
      View all card transactions
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Txn, Expense } from '../TypeDefs';

const getExpenseIcon = (expense: Expense): string => {
  switch (expense) {
    case 'retail':
      return '../assets/box.svg';
    case 'travel':
      return '../assets/flights.svg';
    case 'entertainment':
      return '../assets/horn.svg';
    default:
      return '../assets/box.svg';
  }
};

const getExpenseBg = (expense: Expense): string => {
  switch (expense) {
    case 'retail':
      return 'bg-[#E5F8ED]';
    case 'travel':
      return 'bg-[#EAF5FF]';
    case 'entertainment':
      return 'bg-[#FCE8EE]';
    default:
      return 'bg-[#E5F8ED]';
  }
};

const formattedAmount = (amount: string) => {
  if (!amount) return ''
  const num = Number(amount.replace(/,/g, ''))
  return num.toLocaleString('en-IN') // Use 'en-IN' for Indian comma format
}

defineProps({
  transactions: {
    type: Array as () => Txn[],
    required: true,
    default: () => []
  }
})
</script>
