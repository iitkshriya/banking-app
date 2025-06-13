export interface Txn {
  id: string
  label: string
  date: string
  amount: number
  status: TxnStatus
  expenseType: Expense
}

export type TxnStatus = 'credit' | 'debit'

export type Expense = 'retail' | 'travel' | 'entertainment'

export interface CardDetail {
  id: string
  name: string
  number: string
  issuedBy: 'aspire'
  network: 'visa'
  expiry: string
  cvv: string
  active: boolean
  freezeStatus: boolean
  limit: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface CreditInfoResponse {
  [key: string]: {
    label: string
    cards: string[]
  }
}

export interface CategoryData {
  label: string
  cards: CardsData
}

export interface CardsData {
  [key: string]: CardDetail
}

export interface CreditInfoData {
  [key: string]: CategoryData
}

export type TabComponentsKeys = 'card_section'

export type TabItem<P> = {
  id: string
  label: string
  content: TabComponentsKeys
  props: P
}

export type UserDetails = {
  id: string
  accountNumber: string
  balance: number
}

export type CardUpdates = {
  property: keyof CardDetail
  type: 'string' | 'number' | 'boolean' | 'null'
  value: string | number | boolean | null
}
