import Home from '@/assets/homeIcon.svg';
import Card from '@/assets/greenCard.svg';

export const NavItems = [
  { name: 'Home', icon: Home },
  { name: 'Cards', icon: Card },
  { name: 'Payments', icon: '@/assets/paymentsIcon.svg' },
  { name: 'Credit', icon: '../assets/creditIcon.svg' },
  { name: 'Settings', icon: '../assets/user.svg' }
];

export const CardActionsList = [
  { name: 'Freeze card', icon: "../assets/freeze.svg", type: 'freeze' },
  { name: 'Set spend limit', icon: "../assets/spendLimit.svg", type: 'spendLimit' },
  { name: 'Add to GPay', icon: "../assets/gPayIcon.svg", type: 'gPay' },
  { name: 'Replace', icon: "../assets/replaceCard.svg", type: 'replace' },
  { name: 'Cancel', icon: "../assets/deactivateCard.svg", type: 'cancel' }
];

