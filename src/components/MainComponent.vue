<template>
    <main class="flex-1 p-4 md:p-15 space-y-6">
      <Balance :balance="user.balance" :addCardData="addCardData" />
      <Tabs :tabs="tabItems" v-if="tabItems.length" />
    </main>
</template>

<script setup lang="ts">
import Tabs from '@/components/TabsComponent.vue';
import Balance from '@/components/BalanceCard.vue';
import { onMounted, ref } from 'vue';
import { addCard, getCreditInfo } from '@/data/mocks/getCreditInfo';
import type { CardDetail, TabComponentsKeys, TabItem } from '@/TypeDefs';

const props = defineProps<{
  user: {
    id: string;
    accountNumber: string;
    balance: number;
  };
}>();

type TabItemProps = {
  cardList: string[];
}

const tabItems = ref<TabItem<TabItemProps>[]>([]);
const addCardLoading = ref<boolean>(false);

const addCardData = async (categoryId: string, card: CardDetail) => {
  addCardLoading.value = true;
  try {
    const response = await addCard(categoryId, card);
    if (!response.success) {
      throw new Error(response.message || 'Failed to add card');
    }
    tabItems.value = Object.entries(response.data).map(([key, item]) => {
      return {
          "id": key,
          "label": key.charAt(0).toUpperCase() + key.slice(1),
          "content": "card_section" as TabComponentsKeys,
          "props": { cardList: item.cards },
      };
    }) || [];
  } catch (error) {
    console.error('Error adding card:', error);
  } finally {
    addCardLoading.value = false;
  }
};

const fetchData = async () => {
  try {
    const response = await getCreditInfo({ account: props.user.accountNumber })
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch credit info');
    }
    const tabsData = Object.entries(response.data).map(([key, item]) => {
      return {
          "id": key,
          "label": key.charAt(0).toUpperCase() + key.slice(1),
          "content": "card_section" as TabComponentsKeys,
          "props": { cardList: item.cards },
      };
    }) || [];
    if (tabsData.length) {
      tabItems.value = tabsData;
    }
  } catch (error) {
    console.error('Error fetching credit data:', error);
  }
}

onMounted(fetchData);
</script>