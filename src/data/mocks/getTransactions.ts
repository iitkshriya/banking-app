import { faker } from '@faker-js/faker';
import type { Txn, Expense } from '@/TypeDefs';

const expenseType : Expense[]  = ["retail" , "travel" , "entertainment"];

function getRandomDirection(): 'credit' | 'debit' {
  return faker.datatype.boolean() ? 'credit' : 'debit';
}

function getRandomExpenseType(): Expense {
  return faker.helpers.arrayElement(expenseType);
}

export function generateFakerTransaction(id: string): Txn {

  const status = getRandomDirection();
  const amount = faker.number.int({ min: 50, max: 500 });

  return {
    id,
    label: faker.company.name(),
    amount,
    date: faker.date.recent().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    status,
    expenseType: getRandomExpenseType() ,
  };
}

export function getTransactions({ limit }: { card: string, limit: number, offset: number}): Promise<Txn[]> {
  const list = Array.from({ length: limit }, (_, i) =>
    generateFakerTransaction(faker.string.uuid() + i.toString())
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 500) // 500ms delay to simulate API latency
  });
}
