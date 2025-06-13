<template>
  <div class="rounded-lg pb-10 pt-8 px-10 bg-white border-1 border-soft-white card-shadow">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-11">
      <div>
        <CardCarousal ref="activeCardRef" :slides="cardDetailsRef" :loading="cardLoading" :card-component="Card" :cardProps="cardProps" />
        <div class="mt-8 mx-auto max-w-3xl">
          <CardActions :CardActionsList="cardActions()" />
        </div>
      </div>
      <div class="mt-7 flex flex-col gap-6">
        <CollapseCard icon="../assets/details.svg" label="Card details">
          <CardActions :CardActionsList="cardActions()" />
        </CollapseCard>
        <CollapseCard icon="../assets/transactions.svg" label="Recent transactions" v-if="transactions.length > 0">
          <TransactionList :transactions="transactions" />
        </CollapseCard>
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
import CardCarousal from '@/components/CardCarousal.vue';
import CardActions from '@/components/CardActions.vue';
import TransactionList from '@/components/TransactionList.vue';
import Card from '@/components/CardComponent.vue';
import CollapseCard from '@/components/CollapseCard.vue';
import { type CardDetail, type CardUpdates, type Txn } from '@/TypeDefs';
import { computed, onMounted, ref, watch, type Ref } from 'vue';
import { getTransactions } from '@/data/mocks/getTransactions';
import { CardActionsList } from '@/data/appConfig';
import { getCardDetails, updateCard } from '@/data/mocks/getCreditInfo';

const props = defineProps<{
    cardList: string[];
    activeTab: string;
}>();

type CardCarousalExposed = {
  currentSlide: Ref<number>;
};

const activeCardRef = ref<CardCarousalExposed | null>(null);
const cardLoading = ref<boolean>(false);
const cardProps = computed(() => ({ categoryId: props.activeTab, cardLoading: cardLoading, list: cardDetailsRef }))

const cardActions = () => {
  return CardActionsList.map(action => {
    switch (action.type) {
      case 'freeze':
        return {
          ...action,
          name: cardDetailsRef.value[activeCardRef.value?.currentSlide || 0]?.freezeStatus ? 'Unfreeze Card' : 'Freeze Card',
          action: () => {
            console.log(`${action.name} action triggered`);
            if (activeCardRef.value) {
              const currentCardId = props.cardList[activeCardRef.value.currentSlide];
              updateTabItems(currentCardId, { property: 'freezeStatus', value: null, type: "boolean" }, props.activeTab);
            }
          },
        };
      default:
        return {
          ...action,
          action: () => {
            console.log(`${action.name} action triggered`);
          },
        };
    }
  });
}

const cardDetailsRef = ref<CardDetail[]>([]);

const fetchCardDetails = async () => {
  cardLoading.value = true;
  try {
    const response = await getCardDetails({ categoryId: props.activeTab });
    if (response.success) {
      cardDetailsRef.value = response.data;
    } else {
      console.error('Failed to fetch card details:', response.message);
    }
  } catch (error) {
    console.error('Error fetching card details:', error);
  } finally {
    cardLoading.value = false;
  }
};

const updateTabItems = async (cardId: string, cardUpdates: CardUpdates, categoryId: string) => {
  cardLoading.value = true;
  if (!cardId || !categoryId) return;
  try {
    const response = await updateCard(categoryId, cardId, cardUpdates);
    if (response.success) {
      cardDetailsRef.value = response.data;
      console.log('Card updated successfully:');
    } else {
      console.error('Failed to update card:', response.message);
    }
  } catch (error) {
    console.error('Error updating card:', error);
  } finally {
    cardLoading.value = false;
  }
};

const transactions = ref<Txn[]>([])

const fetchTransactions = async (index?: number) => {
  if (index === undefined) return;
  if (index < props.cardList.length) {
    const response = await getTransactions({ card: props.cardList[index], limit: 4, offset: 0 });
    if (response) {
      transactions.value = response;
    } else {
      console.error('Failed to fetch transactions');
    }
  }
};

onMounted(async () => {
  watch(
    () => activeCardRef.value?.currentSlide,
    fetchTransactions,
    { immediate: true }
  );
  watch(
    () => props.cardList,
    fetchCardDetails,
    { immediate: true, deep: true }
  );
});

</script>

<style scoped >
.card-shadow {
  box-shadow: 0 2px 12px #00000014;
}
</style>