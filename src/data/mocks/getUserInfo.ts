import type { UserDetails } from '@/TypeDefs';
import { faker } from '@faker-js/faker';

function generateFakerUser(): UserDetails {
  return {
    id: faker.string.uuid(),
    accountNumber: faker.number.int({ min: 0, max: 100000000000 }).toString(),
    balance: faker.number.int({ min: 0, max: 100000 }),
  };
}

export function setUserInfo(): void {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    const userInfo = generateFakerUser();
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
}

export function getUserInfo(): Promise<UserDetails | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) {
        setUserInfo();
      }
      resolve(userInfo ? JSON.parse(localStorage.getItem('userInfo') || '') : null);
    }, 500); // 500ms delay
  });
}
