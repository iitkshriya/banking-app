<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Add New Credit Card</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select v-model="form.category" class="input" :class="errorClass('category')">
            <option disabled value="">-- Select Category --</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <p v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</p>
        </div>

        <!-- <div>
          <label class="block text-sm font-medium text-gray-700">Card Number</label>
          <input type="text" v-model="form.cardNumber" @input="filterNumberInput('cardNumber', $event)" maxlength="16" class="input" :class="errorClass('cardNumber')" />
          <p v-if="errors.cardNumber" class="text-red-500 text-xs mt-1">{{ errors.cardNumber }}</p>
        </div> -->

        <div>
          <label class="block text-sm font-medium text-gray-700">Card Holder Name</label>
          <input
            type="text"
            v-model="form.cardHolderName"
            class="input"
            :class="errorClass('cardHolderName')"
          />
          <p v-if="errors.cardHolderName" class="text-red-500 text-xs mt-1">
            {{ errors.cardHolderName }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Issued By</label>
          <select v-model="form.issuedBy" class="input" :class="errorClass('issuedBy')" readonly>
            <option disabled value="">-- Select --</option>
            <option value="aspire">Aspire</option>
          </select>
          <p v-if="errors.issuedBy" class="text-red-500 text-xs mt-1">{{ errors.issuedBy }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Card Network</label>
          <select
            v-model="form.cardNetwork"
            class="input"
            :class="errorClass('cardNetwork')"
            readonly
          >
            <option disabled value="">-- Select --</option>
            <option value="visa">Visa</option>
          </select>
          <p v-if="errors.cardNetwork" class="text-red-500 text-xs mt-1">
            {{ errors.cardNetwork }}
          </p>
        </div>

        <!-- <div>
          <label class="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
          <input type="text" v-model="form.expiry" @input="filterNumberInput('expiry', $event)" placeholder="MM/YY" maxlength="5" class="input" :class="errorClass('expiry')" />
          <p v-if="errors.expiry" class="text-red-500 text-xs mt-1">{{ errors.expiry }}</p>
        </div> -->

        <div>
          <label class="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            v-model="form.cvv"
            @input="filterNumberInput('cvv', $event)"
            maxlength="3"
            class="input"
            :class="errorClass('cvv')"
          />
          <p v-if="errors.cvv" class="text-red-500 text-xs mt-1">{{ errors.cvv }}</p>
        </div>

        <div class="flex justify-end space-x-2">
          <button type="button" @click="close" class="px-4 py-2 text-gray-600">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineProps<{ show: boolean }>()
const emit = defineEmits(['close', 'submit'])

const form = reactive({
  category: '',
  cardNumber: '',
  cardHolderName: '',
  issuedBy: 'aspire',
  cardNetwork: 'visa',
  expiry: '',
  cvv: '',
})

const errors = reactive<Record<string, string>>({})

const categories = [
  'My Debit Cards',
  'All Company Cards',
  'Personal Credit Cards',
  'Team Expense Cards',
  'Travel & Business Cards',
]

function filterNumberInput(field: 'cardNumber' | 'cvv' | 'expiry', event: Event) {
  const input = event.target as HTMLInputElement
  const onlyNumbers = input.value.replace(/\D/g, '') // Remove non-digits
  if (field === 'cardNumber') {
    form.cardNumber = onlyNumbers
  }
  if (field === 'cvv') {
    form.cvv = onlyNumbers
  }
  if (field === 'expiry') {
    form.expiry = onlyNumbers
    if (onlyNumbers.length === 1) {
      form.expiry =
        onlyNumbers.charAt(0) === '0' || onlyNumbers.charAt(0) === '1' ? onlyNumbers : ''
    }
    if (onlyNumbers.length === 2) {
      form.expiry =
        onlyNumbers.charAt(0) === '1' && onlyNumbers.charAt(1) > '2'
          ? onlyNumbers.charAt(0)
          : onlyNumbers
    }
    if (onlyNumbers.length > 4) {
      form.expiry = onlyNumbers.slice(0, 4)
    }
    if (onlyNumbers.length > 2) {
      form.expiry = onlyNumbers.slice(0, 2) + '/' + onlyNumbers.slice(2)
    }
  }
}

// const validateExpiry = (val: string) => {
//   const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
//   if (!regex.test(val)) return false

//   const [mm, yy] = val.split('/').map(Number)
//   const now = new Date()
//   const exp = new Date(2000 + yy, mm)

//   return exp > now
// }

const validateForm = () => {
  errors.category = form.category ? '' : 'Category is required'
  // errors.cardNumber = /^\d{16}$/.test(form.cardNumber) ? '' : 'Card number must be 16 digits'
  errors.cardHolderName = !form.cardHolderName.trim()
    ? 'Card holder name is required'
    : !/^[a-zA-Z\s]+$/.test(form.cardHolderName.trim())
      ? 'Only letters and spaces are allowed'
      : ''
  errors.issuedBy = form.issuedBy === 'aspire' ? '' : 'Invalid issuer'
  errors.cardNetwork = form.cardNetwork === 'visa' ? '' : 'Invalid card network'
  // errors.expiry = validateExpiry(form.expiry) ? '' : 'Invalid or expired date'
  errors.cvv = /^\d{3}$/.test(form.cvv) ? '' : 'CVV must be 3 digits'

  return Object.values(errors).every((e) => !e)
}

const handleSubmit = () => {
  if (validateForm()) {
    const card = {
      id: '',
      name: form.cardHolderName,
      number: form.cardNumber,
      issuedBy: 'aspire',
      network: 'visa',
      expiry: form.expiry,
      cvv: form.cvv,
      active: true,
      freezeStatus: false,
      limit: 10000,
    }
    emit('submit', form.category, card)
    close()
  }
}

const close = () => emit('close')

const errorClass = (field: string) => (errors[field] ? 'border-red-500 focus:ring-red-500' : '')
</script>

<style scoped>
@reference "tailwindcss";
.input {
  @apply w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
