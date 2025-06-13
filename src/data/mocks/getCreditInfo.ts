import type {
  ApiResponse,
  CardDetail,
  CardUpdates,
  CreditInfoData,
  CreditInfoResponse,
} from '@/TypeDefs'
import { faker } from '@faker-js/faker'

const CATEGORY_LABELS = [
  'My Debit Cards',
  'All Company Cards',
  'Personal Credit Cards',
  'Team Expense Cards',
  'Travel & Business Cards',
]

function generateFakerCard(id: string): CardDetail {
  const date = faker.date.future().toISOString().slice(0, 7)
  return {
    id,
    name: faker.person.fullName(),
    number: faker.finance.creditCardNumber('################'),
    issuedBy: 'aspire',
    network: 'visa',
    expiry: date.slice(-2) + '/' + date.slice(2, 4),
    cvv: faker.string.numeric(3),
    active: faker.datatype.boolean(),
    freezeStatus: faker.datatype.boolean(),
    limit: faker.number.int({ min: 10000, max: 100000 }),
  }
}

export function setCreditInfo(): { categories: CreditInfoData } {
  const existingCreditInfo = localStorage.getItem('creditInfo')
  if (!existingCreditInfo) {
    const numberOfCategories = faker.number.int({ min: 2, max: CATEGORY_LABELS.length })
    const selectedCategories = faker.helpers.shuffle(CATEGORY_LABELS).slice(0, numberOfCategories)
    const categories = selectedCategories.map((label) => {
      const cardCount = faker.number.int({ min: 1, max: 5 })
      const cardsArray = Array.from({ length: cardCount }, (_, i) =>
        generateFakerCard(faker.string.uuid() + i),
      )
      const cards = Object.fromEntries(cardsArray.map((card) => [card.id, card]))
      return { label, cards }
    })
    const categoriesObject = Object.fromEntries(categories.map((cat) => [cat.label, cat]))
    localStorage.setItem('creditInfo', JSON.stringify({ categories: categoriesObject }))
    return { categories: categoriesObject }
  }
  return JSON.parse(existingCreditInfo) as { categories: CreditInfoData }
}

function addCardToCategory(categoryLabel: string, card: CardDetail): CreditInfoResponse {
  const creditInfo: CreditInfoData = JSON.parse(
    localStorage.getItem('creditInfo') || '{}',
  ).categories
  const category = creditInfo[categoryLabel]

  const date = faker.date.future().toISOString().slice(0, 7)

  const newCardDetails = {
    id: faker.string.uuid(),
    number: faker.finance.creditCardNumber('################'),
    expiry: date.slice(-2) + '/' + date.slice(2, 4),
  }

  if (category) {
    const cardIndex = Object.keys(category.cards).filter(
      (key) => category.cards[key].number === card.number,
    )
    if (cardIndex.length > 0) {
      throw new Error(
        `Card with number ${card.number} already exists in category ${categoryLabel}.`,
      )
    }
    category.cards[newCardDetails.id] = { ...card, ...newCardDetails }
  } else {
    creditInfo[categoryLabel] = {
      label: categoryLabel,
      cards: {
        [newCardDetails.id]: { ...card, ...newCardDetails },
      },
    }
  }
  localStorage.setItem('creditInfo', JSON.stringify({ categories: creditInfo }))
  const result: CreditInfoResponse = {}
  Object.keys(creditInfo).forEach((key) => {
    const cards = creditInfo[key].cards
    result[key] = {
      label: creditInfo[key].label,
      cards: Object.keys(cards),
    }
  })
  return result
}

function updateCardInCategory(
  categoryId: string,
  cardId: string,
  updatedCard: CardUpdates,
): CardDetail[] {
  const creditInfo: CreditInfoData = JSON.parse(
    localStorage.getItem('creditInfo') || '{}',
  ).categories
  const cards = creditInfo[categoryId]?.cards

  if (cards) {
    const storedCard = cards[cardId]
    if (!storedCard) {
      throw new Error(`Card with ID ${cardId} not found in category ${categoryId}.`)
    }
    const updatedValue =
      updatedCard.type === 'boolean' && updatedCard.value === null
        ? !storedCard[updatedCard.property]
        : updatedCard.value

    cards[cardId] = {
      ...storedCard,
      [updatedCard.property]: updatedValue,
    }
    localStorage.setItem('creditInfo', JSON.stringify({ categories: creditInfo }))
  } else {
    console.error(`Category ${categoryId} not found.`)
  }
  return Object.values(cards || {})
}

// function removeCardFromCategory(categoryLabel: string, cardId: string): void {
//   const creditInfo = JSON.parse(localStorage.getItem('creditInfo') || '{}');
//   const category = creditInfo.categories.find((cat: { label: string }) => cat.label === categoryLabel);

//   if (category) {
//     const cardIndex = category.cards.findIndex((card: CardDetail) => card.id === cardId);
//     if (cardIndex !== -1) {
//       category.cards.splice(cardIndex, 1);
//       localStorage.setItem('creditInfo', JSON.stringify(creditInfo));
//     } else {
//       console.error(`Card with ID ${cardId} not found in category ${categoryLabel}.`);
//     }
//   } else {
//     console.error(`Category ${categoryLabel} not found.`);
//   }
// }

export function getCreditInfo({}: { account: string }): Promise<ApiResponse<CreditInfoResponse>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const creditInfo: { categories: CreditInfoData } = setCreditInfo()
      const categories: CreditInfoData = creditInfo.categories
      const result = {} as CreditInfoResponse
      Object.keys(categories).forEach((key) => {
        const cards = categories[key].cards
        result[key] = {
          label: categories[key].label,
          cards: Object.keys(cards),
        }
      })
      resolve({
        success: true,
        data: result,
        message: 'Credit info retrieved successfully.',
      })
    }, 500) // 500ms delay
  })
}

export function getCardDetails({
  categoryId,
}: {
  categoryId: string
}): Promise<ApiResponse<CardDetail[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const creditInfo: { categories: CreditInfoData } = setCreditInfo()
      const categories: CreditInfoData = creditInfo.categories
      const cards = categories[categoryId]?.cards
      resolve({
        success: true,
        data: Object.values(cards || {}),
        message: 'Card details retrieved successfully.',
      })
    }, 500) // 500ms delay
  })
}

// export function deleteCard(categoryLabel: string, cardId: string): Promise<{ success: boolean; message: string }> {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       try {
//         removeCardFromCategory(categoryLabel, cardId);
//         resolve({ success: true, message: 'Card deleted successfully.' });
//       } catch (error) {
//         resolve({ success: false, message: error instanceof Error ? error.message : 'An error occurred.' });
//       }
//     }, 500); // 500ms delay
//   });
// }

export function addCard(
  categoryLabel: string,
  card: CardDetail,
): Promise<ApiResponse<CreditInfoResponse>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const data = addCardToCategory(categoryLabel, card)
        resolve({ success: true, message: 'Card added successfully.', data })
      } catch (error) {
        resolve({
          success: false,
          message: error instanceof Error ? error.message : 'An error occurred.',
          data: {},
        })
      }
    }, 500) // 500ms delay
  })
}
export function updateCard(
  categoryId: string,
  cardId: string,
  updatedCard: CardUpdates,
): Promise<ApiResponse<CardDetail[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const data = updateCardInCategory(categoryId, cardId, updatedCard)
        resolve({ success: true, message: 'Card updated successfully.', data })
      } catch (error) {
        resolve({
          success: false,
          message: error instanceof Error ? error.message : 'An error occurred.',
          data: [],
        })
      }
    }, 500) // 500ms delay
  })
}
